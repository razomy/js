import neo4j from 'neo4j-driver';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEO4J_URI: string;
      NEO4J_USER: string;
      NEO4J_PASSWORD: string;
    }
  }
}

export function create() {
  return neo4j.driver(
    process.env.NEO4J_URI,
    neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD, 'goodreads'),
  );
}
