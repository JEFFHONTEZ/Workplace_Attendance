export const qrCode = {
    url: () => '/user/two-factor-qr-code',
}

export const secretKey = {
    url: () => '/user/two-factor-secret-key',
}

export const recoveryCodes = {
    url: () => '/user/two-factor-recovery-codes',
}

export const regenerateRecoveryCodes = {
    url: () => '/user/two-factor-recovery-codes',
    form: () => ({ action: '/user/two-factor-recovery-codes', method: 'post' as const }),
}

export const enable = {
    url: () => '/user/two-factor-authentication',
    form: () => ({ action: '/user/two-factor-authentication', method: 'post' as const }),
}

export const confirm = {
    url: () => '/user/confirmed-two-factor-authentication',
    form: () => ({ action: '/user/confirmed-two-factor-authentication', method: 'post' as const }),
}

export const disable = {
    url: () => '/user/two-factor-authentication',
    form: () => ({ action: '/user/two-factor-authentication', method: 'delete' as const }),
}

export const show = {
    url: () => '/settings/two-factor',
}

export default {
    qrCode,
    secretKey,
    recoveryCodes,
    regenerateRecoveryCodes,
    enable,
    confirm,
    disable,
    show,
}
