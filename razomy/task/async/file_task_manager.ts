import {AsyncTask, Context} from './async_task';
import {Gate} from 'razomy.gate';


export class FileTaskManager<C extends Context> {
  private current_context: C | null = null;

  constructor(public file_gate: Gate<C>) {
  }

  /**
   * 1. Load state if exists (Continue)
   * Loads the context from the file gate into memory.
   */
  async continue_(): Promise<void> {
    const ctx = this.file_gate.get();
    if (ctx) {
      this.current_context = ctx;
      console.log('State loaded successfully.');
    } else {
      console.log('No existing state found.');
    }
  }

  /**
   * Initialize a new context if one doesn't exist
   */
  init(initialContext: C) {
    if (!this.current_context) {
      this.current_context = initialContext;
    }
  }

  /**
   * Preview/Check: Validate that the task can be executed
   */
  async validate(task: AsyncTask<C>): Promise<boolean> {
    this.ensure_context_loaded();
    try {
      await task.validate(this.current_context!);
      return true;
    } catch (error) {
      console.error(`Validation failed for task ${task.task_id}:`, error);
      return false;
    }
  }

  /**
   * Execute the task with Save-Before and Save-After logic
   */
  async execute(task: AsyncTask<C>): Promise<void> {
    this.ensure_context_loaded();

    // 1. Validate first
    await task.validate(this.current_context!);

    // 2. Snapshot state for history (Deep Copy)
    const snapshot = this.deep_copy(this.current_context!);
    task.history.push(snapshot);

    // 3. Save BEFORE execution (Checkpoint)
    console.log(`Saving checkpoint before task ${task.task_id}...`);
    await this.file_gate.set(this.current_context!);

    try {
      // 4. Execute Task
      console.log(`Executing task ${task.task_id}...`);
      await task.execute(this.current_context!);

      // Update the task's internal context reference to match new state
      task.c = this.current_context!;

      // 5. Save AFTER execution (Commit)
      console.log(`Saving state after task ${task.task_id}...`);
      await this.file_gate.set(this.current_context!);

    } catch (error) {
      console.error(`Execution failed for task ${task.task_id}. Initiating rollback...`, error);
      await this.rollback(task);
      throw error;
    }
  }

  /**
   * Rollback the specific task using its history
   */
  async rollback(task: AsyncTask<C>): Promise<void> {
    this.ensure_context_loaded();

    if (task.history.length === 0) {
      console.warn(`No history available to rollback task ${task.task_id}`);
      return;
    }

    // 1. Run custom rollback logic defined in the task
    await task.rollback(this.current_context!);

    // 2. Restore state from history (pop the last known good state)
    const previous_state = task.history.pop();

    if (previous_state) {
      this.current_context = previous_state;
      task.c = previous_state; // Sync task context

      // 3. Persist the reverted state
      console.log(`Persisting rolled-back state for ${task.task_id}...`);
      await this.file_gate.set(this.current_context!);
    }
  }

  /**
   * Cancel the operation
   */
  async cancel(task: AsyncTask<C>): Promise<void> {
    this.ensure_context_loaded();
    console.log(`Cancelling task ${task.task_id}...`);
    await task.cancel(this.current_context!);
  }

  /**
   * Helper to ensure we have a state to work with
   */
  private ensure_context_loaded() {
    if (!this.current_context) {
      throw new Error('Context is not loaded. Call \'continue()\' or \'init()\' first.');
    }
  }

  /**
   * Utility for deep copying Serializable objects to avoid reference issues in history
   */
  private deep_copy(obj: C): C {
    return JSON.parse(JSON.stringify(obj));
  }
}
