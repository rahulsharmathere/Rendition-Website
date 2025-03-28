import love from '../assets/love.png'
import happy from '../assets/happy.png'
import sad from '../assets/sadness.png'
import courage from '../assets/courage.png'
import anger from '../assets/anger.png'
import disgust from '../assets/disgust.png'
import terror from '../assets/terror.png'
import surprise from '../assets/surprise.png'
import peace from '../assets/peace.png'

import Event1 from '../assets/Event1.jpg'
import Event2 from '../assets/Event2.jpg'
import Event3 from '../assets/Event3.jpg'
import rubaroo from '../assets/Rubaroo.jpg'
import vivacity from '../assets/Vivacity.jpeg'
import odeum from '../assets/Odeum.jpeg'
import reelMaking from '../assets/Reel_Making.jpeg'

import image1 from '../assets/Background/1.jpg'
import image2 from '../assets/Background/2.jpg'
import image3 from '../assets/Background/3.jpg'
import image4 from '../assets/Background/4.jpg'
import image5 from '../assets/Background/5.jpg'
import image6 from '../assets/Background/6.jpg'
import image7 from '../assets/Background/7.jpg'
import image8 from '../assets/Background/8.jpg'
import image9 from '../assets/Background/9.jpg'
import image10 from '../assets/Background/10.jpg'
import image11 from '../assets/Background/11.jpg'
import image12 from '../assets/Background/12.jpg'
import image13 from '../assets/Background/13.jpg'
import image14 from '../assets/Background/14.jpg'
import image15 from '../assets/Background/15.jpg'
import image16 from '../assets/Background/16.jpg'
import image17 from '../assets/Background/17.jpg'
import image18 from '../assets/Background/18.jpg'
import image19 from '../assets/Background/19.jpg'
import image20 from '../assets/Background/20.jpg'
import image21 from '../assets/Background/21.jpg'
import image22 from '../assets/Background/22.jpg'
import image23 from '../assets/Background/23.jpg'
import image24 from '../assets/Background/24.jpg'
import image25 from '../assets/Background/25.jpg'
import image26 from '../assets/Background/26.jpg'
import image27 from '../assets/Background/27.jpg'
import image28 from '../assets/Background/28.jpg'
import image29 from '../assets/Background/29.jpg'
import image30 from '../assets/Background/30.jpg'
import image31 from '../assets/Background/31.jpg'
import image32 from '../assets/Background/32.jpg'
import image33 from '../assets/Background/33.jpg'
import image34 from '../assets/Background/34.jpg'
import image35 from '../assets/Background/35.jpg'
import image36 from '../assets/Background/36.jpg'
import image37 from '../assets/Background/37.jpg'
import image38 from '../assets/Background/38.jpg'
import image39 from '../assets/Background/39.jpg'
import image40 from '../assets/Background/40.jpg'
import image41 from '../assets/Background/41.jpg'
import image42 from '../assets/Background/42.jpg'
import image43 from '../assets/Background/43.jpg'
import image44 from '../assets/Background/44.jpg'
import image45 from '../assets/Background/45.jpg'
import image46 from '../assets/Background/46.jpg'
import image47 from '../assets/Background/47.jpg'
import image48 from '../assets/Background/48.jpg'
import image49 from '../assets/Background/49.jpg'
import image50 from '../assets/Background/50.jpg'

import shivang from '../assets/Shivang_sir.png'
import ananya from '../assets/Ananya_Boss.png'
import aanchal from '../assets/Aanchal_Boss.png'
import maitreyee from '../assets/Maitreyee.png'
import sanyam from '../assets/Sanyam.png'
import mohit from '../assets/Mohit.png'
import harshita from '../assets/harshita.png'
import devansh from '../assets/devansh.png'
import rahul from '../assets/rahul.png'
import y21_team from '../assets/Y21_Team.jpg'
import y22_team from '../assets/Y22_Team.jpg'
import y23_team from '../assets/Y23_Team.jpg'

const backend_URL = "https://rendition-backend.onrender.com"

const emotions = [
    {
        name: "Hasya",
        icon: happy,
        images: {love, peace, disgust},
        description: "Displaying Emotion is one of the hardest yet most satisfying task we do! Learning how to swim in the ocean of emotions smoothly. Making People laugh their hearts out from our acting and bringing a wave of joyfulness in the air is what we excel at."
    },
    {
        name: "Shringar",
        icon: love,
        images: {love, peace, disgust},
        description: "Displaying Emotion is one of the hardest yet most satisfying task we do! Learning how to swim in the ocean of emotions smoothly. Love is in the air and so, it's the most crucial to represent with proper energy and feelings"
    },
    {
        name: "Karuna",
        icon: sad,
        images: {love, peace, disgust},
        description: "Displaying Emotion is one of the hardest yet most satisfying task we do! Learning how to swim in the ocean of emotions smoothly. Sadness is felt in the heart and grasping it on demand and showcasing it in front of thousands requires talent and adhereance."
    },
    {
        name: "Rudra",
        icon: anger,
        images: {love, peace, disgust},
        description: "Displaying Emotion is one of the hardest yet most satisfying task we do! Learning how to swim in the ocean of emotions smoothly. Keeping your cool and still showing you anger is quite some skill"
    },
    {
        name: "Shanti",
        icon: peace,
        images: {love, peace, disgust},
        description: "Displaying Emotion is one of the hardest yet most satisfying task we do! Learning how to swim in the ocean of emotions smoothly. Everyone wants some peace in their life and we showcase that to everyone."
    },
    {
        name: "Shourya",
        icon: courage,
        images: {love, peace, disgust},
        description: "Displaying Emotion is one of the hardest yet most satisfying task we do! Learning how to swim in the ocean of emotions smoothly. Everyone demands it yet only some have it. Courage is one of a major emotion to display."
    },
    {
        name: "Adbhut",
        icon: surprise,
        images: {love, peace, disgust},
        description: "Displaying Emotion is one of the hardest yet most satisfying task we do! Learning how to swim in the ocean of emotions smoothly. Surprise is quite hard to display yet one of the best emotions displayed."
    },
    {
        name: "Bhayank",
        icon: terror,
        images: {love, peace, disgust},
        description: "Displaying Emotion is one of the hardest yet most satisfying task we do! Learning how to swim in the ocean of emotions smoothly. Terror is born in the heart and travelled throughout the body in a flow of emotions."
    },
    {
        name: "Bhibhatsya",
        icon: disgust,
        images: {love, peace, disgust},
        description: "Displaying Emotion is one of the hardest yet most satisfying task we do! Learning how to swim in the ocean of emotions smoothly. It can be from a thing or from a person or from anything. Disgust makes everyone doubt if they should do it or not."
    },
]

const events = [
    {
        image: Event1,
        author: "Rendition",
        title: "Events",
        topic: "Abhinay",
        description: "In this event, there is a lot of things happening and to enjoy these all events, let's join and celebrate hard"
    },
    {
        image: Event2,
        author: "Rendition",
        title: "Events",
        topic: "Club-Intro",
        description: "In this event, there is a lot of things happening and to enjoy these all events, let's join and celebrate hard"
    },
    {
        image: reelMaking,
        author: "Rendition",
        title: "Events",
        topic: "Reel Making Competition",
        description: "In this event, there is a lot of things happening and to enjoy these all events, let's join and celebrate hard"
    },
    {
        image: rubaroo,
        author: "Rendition",
        title: "Events",
        topic: "Rubaroo",
        description: "In this event, there is a lot of things happening and to enjoy these all events, let's join and celebrate hard"
    },
    {
        image: Event1,
        author: "Rendition",
        title: "Events",
        topic: "Out-Station",
        description: "In this event, there is a lot of things happening and to enjoy these all events, let's join and celebrate hard"
    },
    {
        image: vivacity,
        author: "Rendition",
        title: "Events",
        topic: "Vivacity",
        description: "In this event, there is a lot of things happening and to enjoy these all events, let's join and celebrate hard"
    },
    {
        image: odeum,
        author: "Rendition",
        title: "Events",
        topic: "Odeum",
        description: "In this event, there is a lot of things happening and to enjoy these all events, let's join and celebrate hard"
    },
]

const background_images = [
    image1, image2, image3, image4, image5, image6, image7, image8, image9, image10, image11, image12, image13, image14, image15, image16, image17, image18, image19, image20, image21, image22, image23, image24, image25, image26, image27, image28, image29, image30, image31, image32, image33, image34, image35, image36, image37, image38, image39, image40, image41, image42, image43, image44, image45, image46, image47, image48, image49, image50
]

const team = [
    {
        batch: "Y-21",
        coordinators: ["Shivang Chauhan", "Ananya Khadria", "Aanchal Jain"],
        coordinators_photo: [shivang, ananya, aanchal],
        team_photo: y21_team
    },
    {
        batch: "Y-22",
        coordinators: ["Maitreyee Kulkarni", "Mohit Soni", "Sanyam Munot"],
        coordinators_photo: [maitreyee, mohit, sanyam],
        team_photo: y22_team
    },
    {
        batch: "Y-23",
        coordinators: ["Harshita Devnani", "Rahul Sharma", "Devansh Pareek"],
        coordinators_photo: [harshita, rahul, devansh],
        team_photo: y23_team
    },
    {
        batch: "Y-24",
        coordinators: null,
        coordinators_photo: [],
        team_photo: y23_team
    },
]

// Add New Acts in Sequence only
const acts = [
    {
        category: "MonoAct",
        src: "https://www.youtube.com/embed/QLl_LjB_4AQ?rel=0&si=kuzZTvzhr1hmy2KD",
        title: "Lift Monoact By Kavya Patni",
    },
    {
        category: "MonoAct",
        src: "https://www.youtube.com/embed/6B7kguECnRs?rel=0&si=6WiNharUK9h1sZEP",
        title: "Poet Monoact By Navya Jain",
    },
    {
        category: "MonoAct",
        src: "https://www.youtube.com/embed/bBn5mTiggxo?rel=0&si=4nLKso3Wn8t00-A8",
        title: "MeeraBai Monoact By Kriti Sharma",
    },
    {
        category: "MonoAct",
        src: "https://www.youtube.com/embed/7AFAV2b_yPE?rel=0&si=aVPecZapF-KhrUJm",
        title: "Teenage Dirtbag Monoact By Saanvi"
    },
    {
        category: "StagePlay",
        src: "https://www.youtube.com/embed/XZgwSfBHA_w?rel=0&si=W0GYF4XTUMw8SAhb",
        title: "StagePlay By Team Cream & Hymen",
    },
    {
        category: "StagePlay",
        src: "https://www.youtube.com/embed/Se5LobspQI8?rel=0&si=j6tG7HmlEUuQZIZa",
        title: "StagePlay By Team HIV",
    },
    {
        category: "StagePlay",
        src: "https://www.youtube.com/embed/PVza2mIk8SU?rel=0&si=dldVl4fgrUCVW7b-",
        title: "StagePlay By Team Rab ne Chadha di Thodi",
    },
]

const questions = {
    Actor : [
        'Everyone at some point in their lives has thought of portraying a character. So, name any such favourite character of yours. This character can be a part of a movie, a drama, a novel or it can also be an inspiration from real life.',
        'Share any of your performance/experience with us.(optional)'
    ],
    Scripter : [
        'Amid the tapestry of storytelling, can you spin a new narrative for the closure of a movie frequently adorned with the label of overrated? What we want from you is to craft a compelling short story that brings this alternative ending to life, weaving together the threads of imagination and creativity.',
        'Transport yourself into the world of a story, where you inhabit the persona of a chosen character. As the threads of imagination weave you into their narrative, consider the choices you would make, the emotions you would feel, and the paths you would tread. Paint a literary canvas that vividly captures the essence of this characters journey, inviting readers to stroll alongside you through the captivating landscape of your envisioned adventure."',
    ],
    Graphic_Designer : [
        'Which platform do you prefer for designing purpose?',
        'Share your work(s) with us!'
    ],
    Video_Editor : [
        'Which software do you prefer for editing purpose?',
        'Share the drive link that contains any work(related to video editing) you have done in the past or something that you have recently created.'
    ],
}

const roles = ['Actor', 'Scripter', 'Graphic_Designer', 'Video_Editor'];

export {emotions, events, background_images, team, acts, questions, backend_URL, roles};