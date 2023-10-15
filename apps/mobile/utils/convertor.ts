export const stringtoUrl = (str: string) => {
    if (!str) return '';
    return str.replace(/%20/g, ' ').replace(/%3A/g, ':').replace(/%2F/g, '/').replace(/%3F/g, '?').replace(/%3D/g, '=').replace(/%26/g, '&');
};