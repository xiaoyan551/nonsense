### nginx配置



```
server {
		listen 8020;
		server_name 10.10.0.99;
		


	location /api/ {
     	proxy_set_header Upgrade $http_upgrade;
		proxy_set_header Connection "upgrade";
		proxy_set_header X-Real-IP $remote_addr;
		proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
		proxy_set_header Host $host;
		proxy_redirect off;
		# http://10.10.0.230:9080/最后面的斜杠有表示会替换调匹配的/api/
	    proxy_pass http://10.10.0.230:9080/;
  	}
	
	location / {
		# 历史路由配置
		try_files $uri $uri/ /index.html;
		root html;
		index index.html;
	}

}
```