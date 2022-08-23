git使用笔记

###  从远程仓库获取代码
##### 克隆仓库
```
git clone http://myrepo.xxx.com/project/.git ,这样在git_work目录下得到一个project子目录
```

##### 查看所有远程仓库
```
git branch -a，列出所有分支名称如下：
remotes/origin/dev
remotes/origin/release
git checkout -b dev origin/dev，作用是checkout远程的dev分支，在本地起名为dev分支，并切换到本地的dev分支
```

###  代码提交
#####  提交代码到本地
```
git add readme.txt 将文件从工作区添加到暂存区
git commit -m "this is commit" 将文件从暂存区提交到版本库
git reset HEAD 从暂存区回退到工作区
git diff 查看工作区文件修改前后的差异
git status 查看工作区与暂存区的文件修改状态
git log 查看提交日志
git reset --hard HEAD^ 回退到上一版本
git branch page 创建新分支page
git checkout page 切换到分支page
git checkout -b page 相当于上面两条一起
git branch 查看分支
git merge page 合并分支page到当前分支，
git branch -d page 删除page分支
git stash：暂存本地修改
git stash pop ：恢复本地修改
git checkout .  放弃本地所有修改

```
#####  提交代码到远程仓库
```
git push -u origin master 创建远程分支master并推送
git push origin master 推送到远程分支master
git clone url 克隆一个远程库到本地
```

若需设置忽略的文件已经处于被跟踪状态，可以通过git 命令设置忽略

　　 git update-index --assume-unchanged /path/file #设置忽略跟踪

　　 git update-index --no-assume-unchanged /path/to/file  #恢复跟踪
　　 


