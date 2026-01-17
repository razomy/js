import {AsyncTask, Context} from './async_task';
import {Gate} from 'razomy.gate';


export class FileTaskManager<C extends Context> {
  private currentContext: C | null = null;

  constructor(public file_gate: Gate<C>) {
  }

  /**
   * 1. Load state if exists (Continue)
   * Loads the context from the file gate into memory.
   */
  async continue_(): Promise<void> {
    const ctx = this.file_gate.get();
    if (ctx) {
      this.currentContext = ctx;
      console.log('State loaded successfully.');
    } else {
      console.log('No existing state found.');
    }
  }

  /**
   * Initialize a new context if one doesn't exist
   */
  init(initialContext: C) {
    if (!this.currentContext) {
      this.currentContext = initialContext;
    }
  }

  /**
   * Preview/Check: Validate that the task can be executed
   */
  async validate(task: AsyncTask<C>): Promise<boolean> {
    this.ensureContextLoaded();
    try {
      await task.validate(this.currentContext!);
      return true;
    } catch (error) {
      console.error(`Validation failed for task ${task.taskId}:`, error);
      return false;
    }
  }

  /**
   * Execute the task with Save-Before and Save-After logic
   */
  async execute(task: AsyncTask<C>): Promise<void> {
    this.ensureContextLoaded();

    // 1. Validate first
    await task.validate(this.currentContext!);

    // 2. Snapshot state for history (Deep Copy)
    const snapshot = this.deepCopy(this.currentContext!);
    task.history.push(snapshot);

    // 3. Save BEFORE execution (Checkpoint)
    console.log(`Saving checkpoint before task ${task.taskId}...`);
    await this.file_gate.set(this.currentContext!);

    try {
      // 4. Execute Task
      console.log(`Executing task ${task.taskId}...`);
      await task.execute(this.currentContext!);

      // Update the task's internal context reference to match new state
      task.c = this.currentContext!;

      // 5. Save AFTER execution (Commit)
      console.log(`Saving state after task ${task.taskId}...`);
      await this.file_gate.set(this.currentContext!);

    } catch (error) {
      console.error(`Execution failed for task ${task.taskId}. Initiating rollback...`, error);
      await this.rollback(task);
      throw error;
    }
  }

  /**
   * Rollback the specific task using its history
   */
  async rollback(task: AsyncTask<C>): Promise<void> {
    this.ensureContextLoaded();

    if (task.history.length === 0) {
      console.warn(`No history available to rollback task ${task.taskId}`);
      return;
    }

    // 1. Run custom rollback logic defined in the task
    await task.rollback(this.currentContext!);

    // 2. Restore state from history (pop the last known good state)
    const previousState = task.history.pop();

    if (previousState) {
      this.currentContext = previousState;
      task.c = previousState; // Sync task context

      // 3. Persist the reverted state
      console.log(`Persisting rolled-back state for ${task.taskId}...`);
      await this.file_gate.set(this.currentContext!);
    }
  }

  /**
   * Cancel the operation
   */
  async cancel(task: AsyncTask<C>): Promise<void> {
    this.ensureContextLoaded();
    console.log(`Cancelling task ${task.taskId}...`);
    await task.cancel(this.currentContext!);
  }

  /**
   * Helper to ensure we have a state to work with
   */
  private ensureContextLoaded() {
    if (!this.currentContext) {
      throw new Error('Context is not loaded. Call \'continue()\' or \'init()\' first.');
    }
  }

  /**
   * Utility for deep copying Serializable objects to avoid reference issues in history
   */
  private deepCopy(obj: C): C {
    return JSON.parse(JSON.stringify(obj));
  }
}
