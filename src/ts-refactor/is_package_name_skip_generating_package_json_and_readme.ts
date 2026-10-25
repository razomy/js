
export function isPackageNameSkipGeneratingPackageJsonAndReadme(name: string) {
    return name === '@razomy/nuxt'
    || name === '@razomy/nuxt-test-fixtures-basic'
    || name === '@razomy/vue'
    || name === '@razomy/hir-vue'
    || name === '@razomy/vue-resource'
    || name === '@razomy/code-vue-playground'
    || name === '@razomy/code-nuxt-playground'
    || name === '@razomy/shell'
    || name === '@razomy/cloud-db-pg'
}
