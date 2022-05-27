# Twisearch

Twesearch is a CLI tool that makes it easy to perform advanced searches on Twitter.
This tool opens your default browser with a URL based on the information you enter.
Works only on Mac or Windows.

![CleanShot 2022-05-27 at 11 12 57](https://user-images.githubusercontent.com/43805056/170615501-aa7ca466-c6ce-49ac-be34-60c40448fcc8.gif)

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
