
export function isPackageNameSkipGeneratingPackageJsonAndReadme(name: string) {
    return name === '@razomy/nuxt'
    || name === '@razomy/vue'
    || name === '@razomy/rl-vue'
    || name === '@razomy/vue-resource'
}
