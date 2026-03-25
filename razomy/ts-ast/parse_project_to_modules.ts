import { Project } from "ts-morph";
import type { Module } from "../abstracts/ast/ast";
import {parseSourceFile} from "./parse_source_file";

/**
 * Main entry point: Parses an entire ts-morph Project
 */
export function parseProjectToModules(project: Project): Module[] {
    const modules: Module[] = [];
    for (const sourceFile of project.getSourceFiles()) {
    modules.push(parseSourceFile(sourceFile));
    }

    return modules;
}
