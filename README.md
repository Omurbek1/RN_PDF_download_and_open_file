
Search
Write

Omurbek Mamytbekov
Как загрузить удаленные PDF-файлы и открыть PDF-файл в React Native
Omurbek Mamytbekov
Omurbek Mamytbekov

2 min read
·
Just now





В этом посте я опишу свое обучение удаленной загрузке PDF-файлов и как открыть PDF-файлы на OS и Android.

Настройте проект: сначала создадим пустой проект, нажав:

npx react-native@latest init RN_Download_PDF
У него будет всего две кнопка, которая попытается загрузить этот образец PDF-файла и открыть скачанный файл . Это наш исходный код,


Загрузить PDF: Теперь давайте напишем нашу функцию загрузки. Перед этим нам нужно будет скачать 2 модуля.

response-native-blob-util : отличная библиотека для загрузки файлов.
response-native-share : для iOS мы хотели бы сохранить файлы на нашем телефоне, следовательно, и библиотеку общего доступа.
Вот код:

const downloadFile = () => {
    const source = 'https://www.africau.edu/images/default/sample.pdf';
    let dirs = ReactNativeBlobUtil.fs.dirs;
    ReactNativeBlobUtil.config({
      fileCache: true,
      appendExt: 'pdf',
      path: `${dirs.DocumentDir}/${source}`,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        title: source,
        description: 'File downloaded by download manager.',
        mime: 'application/pdf',
      },
    })
      .fetch('GET', source)
      .then(res => {
        // in iOS, we want to save our files by opening up the saveToFiles bottom sheet action.
        // whereas in android, the download manager is handling the download for us.
        if (Platform.OS === 'ios') {
          const filePath = res.path();
          let options = {
            type: 'application/pdf',
            url: filePath,
            saveToFiles: true,
          };
          Share.open(options)
            .then(resp => console.log(resp))
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log('BLOB ERROR -> ', err));
  };
Открыть PDF: Теперь давайте напишем вторую функцию открыть. Перед этим нам нужно будет скачать 2 модуля.

lreact-native-file-viewer отличная библиотека для открыть файлов.
react-native-document-picker
Код:

const openFile = async () => {
    try {
      const res: any = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf],
      });

      await FileViewer.open(res.uri);
    } catch (e) {
      if (DocumentPicker.isCancel(e)) {
        console.log('Document is cancelled');
      } else {
        console.log('Document is cancelled');
      }
    }
  };
Вывод функциональности:



Full code you can download my github!

Nice day)

React Native
Pdf
Filé
React




Omurbek Mamytbekov
Written by Omurbek Mamytbekov
2 Followers
Software developer & Billionaire & Travel

Edit profile
More from Omurbek Mamytbekov
Как использовать React-Native-Image-Picker?
Omurbek Mamytbekov
Omurbek Mamytbekov

Как использовать React-Native-Image-Picker?
Как выбрать медиа из галереи или камеры?
4 min read
·
20 hours ago
3



React деген эмне жана аны кантип өздөштүрүү керек?
Omurbek Mamytbekov
Omurbek Mamytbekov

React деген эмне жана аны кантип өздөштүрүү керек?
Биз популярдуу JS китепканасы жөнүндө сүйлөшүп, аны изилдөөнүн планын беребиз.
6 min read
·
Aug 14, 2022
1



Nest.js — ToDo колдонмосу үчүн Rest API түзөбүз
Omurbek Mamytbekov
Omurbek Mamytbekov

Nest.js — ToDo колдонмосу үчүн Rest API түзөбүз
Акыркы кодду менин githubымдан таба аласыз
4 min read
·
Jun 2


2022-жылы эң популярдуу болгон Backend Frameworkтору.
Omurbek Mamytbekov
Omurbek Mamytbekov

2022-жылы эң популярдуу болгон Backend Frameworkтору.
Backend фреймворктору дүйнө жүзү боюнча ишканалар учун кеңири таркалган жана тиркемелерди иштеп чыгууда маанилүү ролду ойнойт. Бул макалада…
6 min read
·
Aug 23, 2022


See all from Omurbek Mamytbekov
Recommended from Medium
A personal, non-partisan perspective on the Israel-Hamas war
Isaac Saul
Isaac Saul

A personal, non-partisan perspective on the Israel-Hamas war
To understand this war, we must understand the thousand-year history that led us here
11 min read
·
4 days ago
11.7K

302



The ChatGPT Hype Is Over — Now Watch How Google Will Kill ChatGPT.
AL Anany
AL Anany

The ChatGPT Hype Is Over — Now Watch How Google Will Kill ChatGPT.
It never happens instantly. The business game is longer than you know.

·
6 min read
·
Sep 1
14.1K

428



Lists


Stories to Help You Grow as a Software Developer
19 stories
·
464 saves



General Coding Knowledge
20 stories
·
443 saves
Databricks role-based and specialty certification line-up.


New_Reading_List
174 stories
·
150 saves



Medium Publications Accepting Story Submissions
154 stories
·
835 saves
Why Japanese Websites Look So Different
Mirijam Missbichler
Mirijam Missbichler

Why Japanese Websites Look So Different
& how to analyze design choices without jumping to conclusions
8 min read
·
May 2
14.7K

217



Bye Bye, Spotify
Scott-Ryan Abt
Scott-Ryan Abt

in

Pitfall

Bye Bye, Spotify
And see ya later, all you subscription services in my little empire

·
4 min read
·
Aug 20
12.9K

303



10 tiny habits that can change your life.
Madhav Bahl
Madhav Bahl

10 tiny habits that can change your life.
I tried these for 20 days and here’s the result!
8 min read
·
Jul 25
3.1K

77



14 habits that make you more focused than 98% of people
Alex Mathers
Alex Mathers

14 habits that make you more focused than 98% of people
What’s the deal with staying focused?

·
3 min read
·
May 18
7.4K

134



See more recommendations
Help

Status

About

Careers

Blog

Privacy

Terms

Text to speech

Teams
