---
layout: post
title: How do I update the existing planner tasks using Excel?
main: Apps4.Pro Planner Manager
cub: Chrome Extension
contentUrl: /microsoft-teams-translation
tags: [Addin]
---
![banner](/assets/images/microsoft-teams-translation/microsoft-teams-translation.png)

Microsoft announced translation feature in Microsoft Teams. This will break the language barrier between the team members.

By default, the translation feature is not enabled in Microsoft, your administrator need to enable it. This blog post shows how to enable this feature and translation in action.

Translation feature is present under the Teams Messaging policy. At the time of writing this blog, this option is not lightened up in [Teams & Skype for Business Admin Center](https://admin.teams.microsoft.com/). So, we need to enable it using PowerShell.

### **Enable translation feature in Teams Messaging policy using PowerShell**

Connect using Skype for Business Online module
````
  Import-Module SkypeOnlineConnector
            $cred = Get-Credential
            $session = New-CsOnlineSession -Credential $cred
            Import-PSSession $session
````

Check the Global Teams Messaging Policy, whether translation is enabled or not
````
 Get-CsTeamsMessagingPolicy -Identity Global
````
![get policy](/assets/images/microsoft-teams-translation/get-policy.png)

If not set, enable it as follows
````           
 Set-CsTeamsMessagingPolicy -Identity Global -AllowUserTranslation $True
````

Wait for few minutes and reopen your Teams client to find the translation feature.

![teams-translation](/assets/images/microsoft-teams-translation/teams-translation.png)

![teams-translation-original](/assets/images/microsoft-teams-translation/teams-translation-original.png)




