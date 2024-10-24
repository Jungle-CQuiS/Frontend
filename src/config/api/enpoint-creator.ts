import { API_PREFIX } from "./constants";

type PathParams = Record<string, string | number>;

export class EndpointCreator {
    private basePrefix: string;
    
    constructor(basePrefix: string) {
        this.basePrefix = basePrefix;
    }

    create(path: string) {
        return `${API_PREFIX}${this.basePrefix}${path}`;
    }

    // 동적 파라미터가 필요한 경우를 위한 메서드
    createWithParams(path: string, params?: PathParams) {
        let endpoint = `${API_PREFIX}${this.basePrefix}${path}`;
        
        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                endpoint = endpoint.replace(`:${key}`, String(value));
            });
        }
        
        return endpoint;
    }
}