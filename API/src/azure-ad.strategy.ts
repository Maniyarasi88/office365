// azure-ad.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { BearerStrategy } from 'passport-azure-ad';

const config = {
  credentials: {
    // tenantID: 'Enter_your_tenantID',
    // clientID: 'Enter_your_clientID',
    // audience: 'Enter_your_clientID',
    tenantID: 'f8cdef31-a31e-4b4a-93e4-5f571e91255a',
    clientID: 'a3805513-589b-489d-ba49-3fdfcb843736',
    audience: 'a3805513-589b-489d-ba49-3fdfcb843736',
  },
  metadata: {
    authority: 'login.microsoftonline.com',
    discovery: '.well-known/openid-configuration',
    version: 'v2.0',
  },
  settings: {
    validateIssuer: false,
    passReqToCallback: false,
    loggingLevel: 'info',
  },
};
// const EXPOSED_SCOPES = ['Files.Read'];
// const EXPOSED_SCOPES = ['api://a3805513-589b-489d-ba49-3fdfcb843736/Files.Read'];
const EXPOSED_SCOPES = ['a3805513-589b-489d-ba49-3fdfcb843736/.default'];


@Injectable()
export class AzureAdStrategy extends PassportStrategy(
  BearerStrategy,
  'azure-ad',
) {
  constructor() {
    super({
      identityMetadata: `https://${config.metadata.authority}/${config.credentials.tenantID}/${config.metadata.version}/${config.metadata.discovery}`,
      issuer: `https://${config.metadata.authority}/${config.credentials.tenantID}/${config.metadata.version}`,
      clientID: config.credentials.clientID,
      audience: config.credentials.audience,
      validateIssuer: config.settings.validateIssuer,
      passReqToCallback: config.settings.passReqToCallback,
      loggingLevel: config.settings.loggingLevel,
      // scope: EXPOSED_SCOPES,
      loggingNoPII: false,
      resource: 'https://graph.windows.net',


      // identityMetadata: https://login.microsoftonline.com/your_tenant_name.onmicrosoft.com/.well-known/openid-configuration,
      // responseType: 'id_token code',
      // responseMode: 'form_post',
      resourceURL: 'https://graph.windows.net'

    });
  }

  async validate(profile: any): Promise<any> {
    // Implement user validation and extraction of necessary user information from profile
    // Example: Extract and store user details in a session
    return profile;
  }
}
