FROM node:10-alpine

ENV PATH /app/node_modules/.bin:$PATH  

WORKDIR /app

COPY package*.json ./

RUN npm install --silent  

#RUN npm install react-scripts@3.4.1 -g  
 
COPY . ./  
 
CMD ["npm", "run", "docker"] 

EXPOSE 80