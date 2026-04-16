
export function isPackageNameSkip(name: string) {
    return name === 'razomy/_razomy'
    || name === 'razomy/nuxt'
    || name === 'razomy/vue'
    || name === 'razomy/rala-vue'
}
