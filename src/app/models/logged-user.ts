export class LoggedUserModel {
    email?: string
    idToken? : string
    refreshToken?: string
    displayName?: string
    expire?: number

    constructor(email?:string, idToken?:string, refreshToken?:string, displayName?:string, expireIn?: string) {
        this.email=email
        this.idToken=idToken
        this.refreshToken=refreshToken
        this.displayName=displayName
        if(expireIn) {
            const expire = new Date()
            expire.setSeconds(parseInt(expireIn))
            this.expire=expire.getTime()    
        }
    }
}