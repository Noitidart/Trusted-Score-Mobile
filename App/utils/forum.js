// @flow

export function getInitials(fullName: string): string {

    const fullNameTrimmed = fullName.trim();

    if (!fullNameTrimmed) return '';

    return fullNameTrimmed.split(/\s+/g)
           // .filter(name => name) // if we have "   blah   "
           .map(name => name[0].toUpperCase())
           .join('')
}
