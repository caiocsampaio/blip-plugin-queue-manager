import { IframeMessageProxy } from 'iframe-message-proxy'
import iframeService from './iframeServices'

export const startLoading = () => IframeMessageProxy.sendMessage({ action: 'startLoading' })

export const stopLoading = () => IframeMessageProxy.sendMessage({ action: 'stopLoading' })

export const setHeight = (height) => IframeMessageProxy.sendMessage({ action: 'heightChange', content: height })

export const showToast = (toast) => IframeMessageProxy.sendMessage({ action: 'toast', content: toast })

export const withLoading = async func => {
    startLoading()

    try {
        return await func()
    } finally {
        stopLoading()
    }
}

export const withoutLoading = async func => {
    return await func();
}

export const getOrCreateConfigResource = async (configResource) => {
    let resource = {};
    try {
        resource = await iframeService.getResource(configResource);
    } catch (error) {
        resource = {};
        await iframeService.setResource(configResource, 'application/json', {})
    }
    return resource;
}