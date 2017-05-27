FROM node:6

COPY . /mnt/annotator

WORKDIR /mnt/annotator

# set node srouce
RUN echo "registry = https://registry.npm.taobao.org" >> /etc/npmrc

RUN npm install

CMD npm start
