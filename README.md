# React-Native AWS Cognito EXPO

An application to demonstrate how to use AWS Cognito in a react-native application.

## Get Started 

1. Add your AWS Cognito UserPoolId and ClientId to /src/authentication/auth.js.
2. Open the project in Expo XDE.
3. Open the project in a Simulator to see it working. 

## amazon-cognito-identity-js

Modified files from v1.19.0 of amazon-cognito-identity-js are in the lib directory.
They were modified as follows to allow them to work in react-native.

In the following files:

* AuthenticationHelper.js
* CognitoAccessToken.js
* CognitoIdToken.js
* CognitoUser.js

Change 

```Javascript
import { util } from 'aws-sdk/global';
```

to 

```Javascript
import { util } from 'aws-sdk/dist/aws-sdk-react-native';
```

In CognitoUserPool.js:
 
Change  

```Javascript
import CognitoIdentityServiceProvider from 'aws-sdk/clients/cognitoidentityserviceprovider';
```

to 

```
import { CognitoIdentityServiceProvider } from 'aws-sdk/dist/aws-sdk-react-native';
```

## Screenshots

### Signin
<img src="https://github.com/torrens/react-native-aws-cognito-expo/blob/master/screenshots/signin.png" width="300"/>

### Register
<img src="https://github.com/torrens/react-native-aws-cognito-expo/blob/master/screenshots/register.png" width="300"/>

### Verify
<img src="https://github.com/torrens/react-native-aws-cognito-expo/blob/master/screenshots/verify.png" width="300"/>

### Forgot Password
<img src="https://github.com/torrens/react-native-aws-cognito-expo/blob/master/screenshots/forgot.png" width="300"/>