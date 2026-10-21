
export function isPackageNameSkipGeneratingPackageJsonAndReadme(name: string) {
    return name === '@razomy/nuxt'
    || name === '@razomy/vue'
    || name === '@razomy/hir-vue'
    || name === '@razomy/vue-resource'
}
