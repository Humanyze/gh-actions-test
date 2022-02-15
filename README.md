# Deployment Documentation

The same basic set of actions is being used in this repository in two different ways. The first is the api driven workflow that was created by Mark which is driven by an api action to create a deployment. I am not sure but I think this was because he didn't understand how to use github action in an automatic OR manual fashion. I don't recommend using this format. The other existing action is a manual deployment action that I was tasked with building out. It accepts a branch and an environment name to deploy to. This name is used to do a map look-up inside the action for the cloudfront distribution id. The action currently has a fixed s3 bucket to deploy to. I would suggest a couple of changes before using this action in production, namely making both the cloudfront distribution and the bucket dynamic elements. They could either but returned to the manual form values they once where or referenced with the environmental suffix as either hard coded map values or as suffixed github secrets. The latter would allow on the fly environment creation and modification so would be my suggestion if you are comfortable with the idea that you will not be able to see the values once they are set.

In either case the basic deployment process is the same, the action is triggered, the steps for the action are completed in order

- build
  - checkout the code base
  - setup Node
  - install and test
  - if the build environment is "production"
    - build a production artifact (`yarn build --production`)
  - else
    - build a development artifact (`yarn build`)
  - set aws creds
  - copy build files to s3 and invalidate cloudfront distribution path /index.html
  - create a Sentry release

The files which describe the above are found this repositories .github/workflows directory in the deploy-to-cloudfront.yml and manual-deploy-to-cloudfront.yaml files respectively.

The latter does have one additional step that is triggered by the presence of a github secret name `DEPLOY_FAIL` which is an artifact of my trying to duplicate an error that Mark reported but was unable to reproduce and I never saw or was able to reproduce. The error as reported by Mark stemmed from a transient network issue with the Sentry deployment. The docker image which is used in the Sentry step was failing to download and erroring out. It was reported to but the pipeline in an non-recoverable state. I don't know enough about Sentry to say much about this other than that is what I was told happened though I have difficulty understanding how such a thing would cause the pipeline to be non-recoverable without a new commit which was said to fix the issue.

---

# Using this to test out some Github actions to build and deploy a react app to cloudfront.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
