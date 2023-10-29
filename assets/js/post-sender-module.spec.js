// Import the PostSender class
import { expect, spyOn, describe, it, setSystemTime, beforeAll, beforeEach } from "bun:test";

import PostSender from './post-sender-module';
import CookieManager from "./cookies-manager-module";

const systemDate = new Date("2020-01-01T00:00:00.000Z")

// Mock document.cookie
let originalDocumentCookie = {};

beforeAll(() => {
    setSystemTime(systemDate);
    originalDocumentCookie = Object.getOwnPropertyDescriptor(document, 'cookie');
});

beforeEach(() => {
    Object.defineProperty(document, 'cookie', {
        writable: true,
        value: '', // Initialize the cookie as an empty string
    });
});

describe('PostSender construction', () => {
    it('should create a PostSender instance with default options', () => {
        const postSender = new PostSender('https://example.com');
        expect(postSender.serviceURL).toBe('https://example.com');
        expect(postSender.options.includeISODateString).toBe(true);
        expect(postSender.options.includeUserUUID).toBe(true);
    })

    it('should create a PostSender instance with custom options', () => {
        const customOptions = {
            includeISODateString: false,
            includeUserUUID: false,
        };
        const postSender = new PostSender('https://example.com', customOptions);
        expect(postSender.serviceURL).toBe('https://example.com');
        expect(postSender.options.includeISODateString).toBe(false);
        expect(postSender.options.includeUserUUID).toBe(false);
    })
})


describe('Body content - buildBody', () => {

    const exampleBody = { param1: "param1", param2: "param2" }

    it('Undefined body throw exception', () => {

        const postSender = new PostSender('https://example.com');
        expect(() => {
            postSender.buildBody()
        }).not.toThrow()
    })

    it('Body of the call contains the data passed in parameter of the postData function', () => {

        const customOptions = {
            includeISODateString: false,
            includeUserUUID: false,
        };

        const postSender = new PostSender('https://example.com', customOptions);

        const builtBody = postSender.buildBody(exampleBody)

        expect(builtBody).toEqual(exampleBody)


        it('Body doesnt include ISO data String when not asked to', () => {
            expect(builtBody.date).not.toBeDefined()
        })

        it('Body doesnt include UUID when not asked to', () => {
            expect(builtBody.uuid).not.toBeDefined()
        })

    })


    it('Body includes ISO data String when asked to', () => {

        const customOptions = {
            includeISODateString: true,
            includeUserUUID: false,
        };

        const postSender = new PostSender('https://example.com', customOptions)

        const builtBody = postSender.buildBody(exampleBody)

        expect(builtBody.date).toBeDefined(exampleBody)
        expect(builtBody.date).toEqual(systemDate.toISOString())
    })


    it('Body includes UUID when asked to', () => {

        const customOptions = {
            includeISODateString: false,
            includeUserUUID: true,
        };

        const postSenderInstance = new PostSender('https://example.com', customOptions)

        const mockGetUUID = spyOn(PostSender, "getUUID")
        mockGetUUID.mockReturnValue("4d0b7949-ba2e-4640-a030-775916bcf81a")

        const builtBody = postSenderInstance.buildBody(exampleBody)

        expect(builtBody.uuid).toBeDefined()
        expect(builtBody.uuid).toEqual("4d0b7949-ba2e-4640-a030-775916bcf81a")

    })
})
