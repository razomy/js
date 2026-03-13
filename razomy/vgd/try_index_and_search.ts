import {create} from './create';
import {setup} from './setup';
import {indexFs} from './index_fs';
import {search} from './search';

export async function tryIndexAndSearch(request: string) {
    const db = await create();
    await setup(db);

    const mockCodebase = [
        {
            filePath: 'src/auth.ts',
            chunks: [
                {id: 'chunk_1', text: 'function login(user, pass) { return db.check(user, pass); }'},
                {id: 'chunk_2', text: 'function logout(session) { session.destroy(); }'}
            ]
        },
        {
            filePath: 'src/utils.ts',
            chunks: [
                {id: 'chunk_3', text: 'function formatDate(date) { return date.toISOString(); }'}
            ]
        }
    ];

    const repoName = "my-ai-project";
    const currentCommitId = "a1b2c3d4e5f6g7h8i9j0";

    await indexFs(db, repoName,currentCommitId,mockCodebase);
    const result = await search(db, request);
    await db.close();
    return result;
}

tryIndexAndSearch("what date")
