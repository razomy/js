import * as dbGraph from "@razomy/db-graph";

describe('InMemoryGraphStorage Functional Tests', () => {
  let db: ReturnType<typeof dbGraph.storage.createGraphStorage>;

  beforeEach(() => {
    // 1. Create base
    db = dbGraph.storage.createGraphStorage();

    // 2. Fill with data
    dbGraph.storage.addVertexMut(db, {id: '1', tags: ['User'], value: {name: 'Alice', age: 25}});
    dbGraph.storage.addVertexMut(db, {id: '2', tags: ['User'], value: {name: 'Bob', age: 30}});
    dbGraph.storage.addVertexMut(db, {id: '3', tags: ['User'], value: {name: 'Charlie', age: 35}});
    dbGraph.storage.addVertexMut(db, {id: '101', tags: ['Post'], value: {title: 'Hello Graph DB!'}});

    // Who knows whom (Friends)
    dbGraph.storage.addEdgeMut(db, {from: '1', to: '2', edgeKey: 'KNOWS', value: {weight: 0.8}});
    dbGraph.storage.addEdgeMut(db, {from: '2', to: '3', edgeKey: 'KNOWS', value: {weight: 0.9}});

    // Who liked what
    dbGraph.storage.addEdgeMut(db, {from: '2', to: '101', edgeKey: 'LIKES', value: {date: '2023-10-01'}});
    dbGraph.storage.addEdgeMut(db, {from: '3', to: '101', edgeKey: 'LIKES', value: {date: '2023-10-02'}});
  });

  test('Query 1: Alice\'s friends (1 step OUT)', () => {
    // Start from Alice ('1') -> OUT 'KNOWS'
    let q = dbGraph.query.startQuery(db, '1');
    q = dbGraph.query.stepOut(q, 'KNOWS');

    const result = dbGraph.query.yieldVertices(q);

    expect(result).toHaveLength(1);
    expect(result[0].value.name).toBe('Bob');
  });

  test('Query 2: Friends of friends of Alice (2 steps OUT)', () => {
    // Start from Alice ('1') -> OUT 'KNOWS' -> OUT 'KNOWS'
    let q = dbGraph.query.startQuery(db, '1');
    q = dbGraph.query.stepOut(q, 'KNOWS');
    q = dbGraph.query.stepOut(q, 'KNOWS');

    const result = dbGraph.query.yieldVertices(q);

    expect(result).toHaveLength(1);
    expect(result[0].value.name).toBe('Charlie');
  });

  test('Query 3: Who liked post 101? (Reverse search / IN)', () => {
    // Start from Post ('101') -> IN 'LIKES' -> filter by Tag 'User'
    let q = dbGraph.query.startQuery(db, '101');
    q = dbGraph.query.stepIn(q, 'LIKES');
    q = dbGraph.query.filterHasTag(q, 'User');

    const result = dbGraph.query.yieldVertices(q);
    const names = result.map(v => v.value.name);

    expect(result).toHaveLength(2);
    expect(names).toContain('Bob');
    expect(names).toContain('Charlie');
  });

  test('Edge Case: Searching for non-existent relations should return empty array', () => {
    let q = dbGraph.query.startQuery(db, '1');
    q = dbGraph.query.stepOut(q, 'NON_EXISTENT_EDGE');

    const result = dbGraph.query.yieldVertices(q);
    expect(result).toEqual([]);
  });

  test('Edge Case: Filtering by non-existent tag should return empty array', () => {
    let q = dbGraph.query.startQuery(db, '1');
    q = dbGraph.query.filterHasTag(q, 'Admin'); // Alice is not an Admin

    const result = dbGraph.query.yieldVertices(q);
    expect(result).toEqual([]);
  });
});
