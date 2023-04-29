nvm install stable
nvm alias default stable
npm install -D tailwindcss postcss autoprefixer
npm install --save typescript @types/node @types/react @types/react-dom @types/jest
npm install --save express
npm run build
gcloud config set project cloris-385200
gcloud app deploy app.yaml --verbosity=debug