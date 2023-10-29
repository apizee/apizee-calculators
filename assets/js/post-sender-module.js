
import CookieManager from './cookies-manager-module'

class PostSender {
    /**
     * @param {string} url The url that will be called to post the data to
     * @param {object} options Options
     * @param {bool} options.includeISODateString The url that will be called to post the data to the service.
     * @param {bool} options.includeUserUUID Make sure data sent by the same user is recognizable through a unique id.
     */
    constructor(url, options = { includeISODateString: true, includeUserUUID: true }) {
        this.serviceURL = url
        this.options = options
    }

    /**
     * Add optional elements to the body
     * @param {Object} bodyData Dictionary containing the body sent with the request
     * @returns {Object} 
     */
    buildBody(bodyData = {}) {

        if (this.options.includeISODateString) {
            bodyData['date'] = PostSender.getNowISOString()
        }

        if (this.options.includeUserUUID) {
            bodyData['uuid'] = PostSender.getUUID()
        }

        return bodyData;
    }

    /**
     * Get current time in an ISO string 
     * @returns {string}
     */
    static getNowISOString() {
        return new Date(Date.now()).toISOString()
    }

    /**
     * Return the UUID for the current browser
     * @returns {string}
     */
    static getUUID(){
        let uuid = CookieManager.getCookieValue('trc_uuid')

        if(uuid === undefined) {
            uuid = crypto.randomUUID()

            CookieManager.setCookie('trc_uuid', uuid)
        }

        return uuid
    }

    /**
     * 
     * @param {Object} body Dictionary of data to send through post
     */
    postData(body) {

        const builtBody = this.buildBody(body)
        let requestOptions = { method: 'POST', body: JSON.stringify(builtBody) }

        // Send the POST request
        fetch(this.url, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
            })
            .catch((error) => {
                // Handle any errors that occurred during the fetch
                console.error('Fetch error:', error);
            });
    }
}

export default PostSender