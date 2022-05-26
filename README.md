# Twisearch

Twesearch is a tool that makes it easy to perform advanced searches on Twitter.

## Usage

```zsh
$ npx twisearch
```

Search Twitter is Enter key.
Move next form is Tab key.
Move previous form is Shift + Tab key.

## Parameters

|Name|Type|Description|
|---|---|---|
|Keywords|String|Keywords to search. Multiple words can be set by separating them with a half space.|
|Min favorites|Integer|Minimum number of favorites. Integer value must be positive.|
|Max retweets|Integer|Maximum number of retweets. Integer value must be positive.|
|From user name|String|User name to search from.|
|Except user name|String|User name to exclude from search.|
|To user name|String|User name to search to.|
|Since (yyyy-mm-dd)|Date|Date format is yyyy-mm-dd. Search tweets since the date.|
|Until (yyyy-mm-dd)|Date|Date format is yyyy-mm-dd. Search tweets until the date.|
|Filter images|Boolean|Filter tweets that contain images. Default is false.|
|Filter videos|Boolean|Filter tweets that contain videos. Default is false.|
|Filter links|Boolean|Filter tweets that contain gifs. Default is false.|

## Example

```
                Keywords : Twitter Fun
           Min favorites : 10000
            Min retweets : 50
          From user name : Twitter
   Except from user name : Example
            To user name : Facebook
      Since (yyyy-mm-dd) : 2020-03-09
      Until (yyyy-mm-dd) : 2022-10-28
           Filter images : true
           Filter videos :
            Filter links : false
```
