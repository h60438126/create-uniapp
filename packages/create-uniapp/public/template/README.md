# 编译生产包前检查

## Cordova
- [ ] 检查adjust/appsflyer 沙箱模式

- [ ] 检查Facebook/adjust/appsflyter key
- [ ] 检查js文件是否混淆（混淆前记得保存未混淆的文件）
- [ ] 检查platforms/android/app/build.gradle文件的 minSdkVersion 21和targetSdkVersion 33

## uni

- [ ] 云打包是否去除所有广告选项
- [ ] 云打包是否选中正式包，且选中GooglePlay（AAB）
- [ ] 检查js文件是否混淆（混淆前记得保存未混淆的文件）
- [ ] 检查static/html文件夹（a面）
- [ ] 检查是否选上yk-webmodule插件
- [ ] 检查是否钩上arm64-v8a
- [ ] 检查minSdkVersion 21和targetSdkVersion 33
- [ ] 检查nativeResources/android/res/values/strings.xml文件的Facebook内容（仅a面的时候，可以留空）
- [ ] 检查AndroidManifest.xml 中的Facebook/adjust/appsflyter key
- [ ] 检查webModule插件版本
- [ ] 检查本地插件package.json文件中是否已加入"hooksClass": "com.yks.web_module.WebModuleProxy”,（仅有a面的时候可以手动删除该行）
- [ ] 检查adjust env是否true（adjust env 的true是正式环境，false是沙盒环境）
- [ ] 检查appsflyerDebug是否false（true为启动debug模式，false为关闭）
- [ ] 每次重新提审要改内部版本号（首次跳过）
- [ ] 检查app权限是否已去掉无用的
```json
"permissions" : [
	"<uses-permission android:name=\"android.permission.INTERNET\"/>",
]
```

```json
{
	"pages": [ //pages数组中第一项表示应用启动页，参考：https://uniapp.dcloud.io/collocation/pages
        {
            "path": "pages/index/index",
            "style": {
                "navigationStyle": "custom"
            }
        }
	],
	"globalStyle": {
		"navigationBarTextStyle": "black",
		"navigationBarTitleText": "uni-app",
		"navigationBarBackgroundColor": "#F8F8F8",
		"backgroundColor": "#F8F8F8"
	},
	"uniIdRouter": {}
}
```