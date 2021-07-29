import { IframeMessageProxy } from 'iframe-message-proxy'
import iframeService from './iframeServices'

const startLoading = () => IframeMessageProxy.sendMessage({ action: 'startLoading' })

const stopLoading = () => IframeMessageProxy.sendMessage({ action: 'stopLoading' })

const setHeight = (height) => IframeMessageProxy.sendMessage({ action: 'heightChange', content: height })

const showToast = (toast) => IframeMessageProxy.sendMessage({ action: 'toast', content: toast })

const withLoading = async func => {
    startLoading()

    try {
        return await func()
    } finally {
        stopLoading()
    }
}

const withoutLoading = async func => {
    return await func();
}

const getOrCreateConfigResource = async (configResource) => {
    let resource = {};
    try {
        resource = await iframeService.getResource(configResource);
    } catch (error) {
        resource = {};
        await iframeService.setResource(configResource, 'application/json', {})
    }
    return resource;
}

const commonServices = {
    startLoading,
    stopLoading,
    setHeight,
    showToast,
    withLoading,
    withoutLoading,
    getOrCreateConfigResource
}
export default commonServices;