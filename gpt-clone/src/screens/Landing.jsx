import Typer from "@/components/Typer";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
  const sentences = [
    "Damn, that's crazy",
    "Bro is wrong for that one",
    "Bro has no chill",
    "I'm bored",
    "Damn",
    "I just failed my TNTL challenge",
    "Mm hahaha",
    "Got me feelin' a certain type of way",
    "Bro is literally me",
    "Yea okay",
    "Oh wow, that's really interesting",
    "Scratches chin",
    "And be sure to Like and Subscribe",
    "If you're enjoying this video, please subscribe and hit that bell",
    "Leave a comment telling me what your favorite part is",
    "Like this video if you agree",
    "Did you know that most of my viewers aren't subscribed to me, so let's smash that sub button and ring-a-ding that bell",
    "Now this is epic",
    "Now that's what I call music",
    "Poggers",
    "Yo bro, I'm so confused",
    "Erm, this makes my head hurt",
    "Man, that's tough",
    "Ah, bro is killing me",
    "Bruh, I'm so done, bruh",
    "Duuuuuuuuuuuuude",
    "Erm, did that just happen",
    "He's right behind me, isn't he?",
    "That sounded a lot better in my head",
    "Heh, yeah.. OH kay...",
    "Erm, exqueeze me sauce",
    "If you like what you're seeing, go ahead and subscribe",
    "Bro, who did this",
    "Bro thinks they're sigma",
    "Leave a comment telling me what you ate today",
    "Smash that like button if you agree",
    "That's what I call a ✨VIBE ✨",
    "Chat, is this real?",
    "Man, that's wild bro",
    "Bro, that's wild man",
    "Erm, what the scallop",
    "Yeah, it's official; I'm shooketh",
    "Rip bozo",
    "Make it make sense",
    "Somebody call the waambulance",
    "Thank you, very cool",
    "Are you flipping kidding me?",
    "Oof; that's cringe bro",
    "Uhhhh, talk about a twist ending",
    "Bro, I did not expect that",
    "Yuh, if that were me, I would've done things a little bit differently",
    "Vroom Vroom",
    "I'm literally speechless",
    "Totally",
    "Obsessed",
    "Vibe is crazy",
    "What am I even watching",
    "I'm on the weird side of YouTube",
    "That's gonna leave a mark",
    "This hits different now",
    "Erm, that was unexpected",
    "I can't even",
    "That's actually really funny",
    "Agree to disagree",
    "Dude, that's lowkey wild",
    "Bet",
    "Facts",
    "It's kinda mid",
    "Chat, can we skip this part",
    "That's certainly a choice",
    "This a whole mood right here",
    "Don't ask me where I was on the night of October 13th 2023",
    "This is givin' me all the feels",
    "Talk about a giant W",
    "Talk about a giant L",
    "This video is giving epic sauce",
    "Your honor, I plead the fifth",
    "Womp womp",
    "Leviticus 18:7",
    "Proverbs 21:19",
    "The current time is 4:53pm",
    "I'm ReactBot",
    "Merry Christmas",
    "This video gets a 4 out of 5",
    "Whoever made this video deserves a Big ol' Spanking",
    "Whoever made this video definitely voted for Trump",
    "I find that joke a little offensive",
    "Be sure to credit the creators when reacting to content that isn't yours",
    "Doxxing is a misdemeanor",
    "Giving that an A+",
    "Gonna grade this one a B-",
    "That is such a Gemini move",
    "Skibidi 'go to the polls'",
    "Love the aesthetic",
    "But doctor.. I am Pagliacci",
    "Bro left no crumbs",
    "Bro, who did this",
    "Wishin' my meemaw were still alive to see this",
    "Bro, I wish I could unsee that",
    "Well, that's time I'll never get back",
    "How do I delete someone else's video",
    "I'm feeling a light 7 here",
    "I'm giving this a 7 out of 10",
    "Let's give it up for the real heroes: Reactors",
    "Wiggling my toesies right now",
    "Whoever made this, I hope you become rich and successful one day",
    "Transformative commentary",
    "Sorry, I wasn't paying attention",
    "Sorry, I zoned out",
    "Let's watch that again",
    "*Burps*",
    "C'mon guys, let's get this video trending",
    "C'mon guys, let's upvote this on Reddit",
    "BANGER ALERT",
    "We are so back",
    "It is so over",
    "Videos like this are why I love my country",
    "Bro went sicko mode",
    "Methinks this didn't really happen",
    "It's giving thanks",
    "It's giving rizz",
    "It's giving zest",
    "It's giving staged",
    "It's giving cringe",
    "It's giving girlboss",
    "It's giving sigma",
    "What year is it?",
    "THIS couldn't be made today. [smirks]",
    "Erm, someone call the WOKE police.",
    "Can't do that anymore because of woke",
    "Bro just lost the woke contest",
    "Bro really thinks he's woke",
    "Bro really thinks he's smooth",
    "Methinks I just soiled me undies",
    "Erm, did they just say what I think they said?",
    "Bro really wants us to think he's funny",
    "Bro, not THIS again!!!",
    "When you see it, you'll shit bricks",
    "Yo, can we roll that back?",
    "Not me laughing at THIS",
    "Not me nose-exhaling!",
    "Not me giggling AND kicking my feet",
    "Dude whhhaaaaaaat",
    "Next video",
    "Next TikTok",
    "Okay next one",
    "Like this if you're watching in 2014",
    "Edit-thanks for the likes!",
    "I like this one",
    "I don't like this one",
    "I don't get this one",
    "This is my reacting face [creepy smile]",
    "This is my reacting face [shocked]",
    "This is my reacting face [eyebrow raise]",
    "It's official. This video's epic",
    "Literally obsessed with their hair",
    "This is so Barbie coded",
    "This is giving major Gemini energy",
    "This video makes my tummy hurt",
    "If you criticize me I'll come to your home",
    "I don't know what those big words mean",
    "My commentary makes this transformative",
    "You guys are all my friends",
    "Whoa",
    "Checkmate, atheists",
    "I'm literally dead",
    "Certified banger",
    "Only Virgos can relate"
  ];

  const [sentenceIndex, setSentenceIndex] = useState(Math.floor(Math.random() * sentences.length));
  function handleComp() {
    console.log("Sentence deleted, switching...");

    setSentenceIndex(Math.floor(Math.random() * sentences.length));
  }

  return (
    <div className="maindiv flex  h-screen w-screen">
      <div className="left flex-3/5 bg-[#01002E] h-screen text-purple-400 flex flex-col">
        <div className="p-4 font-bold h-1/2 text-2xl">ChatGPT</div>
        <div className="p-4 h-2/3 text-4xl font-bold">
          <Typer sentence={sentences[sentenceIndex]} onComplete={handleComp} />
        </div>
      </div>
      <div className=" text-3xl right flex-2/5 h-screen bg-black text-center flex flex-col items-center justify-center text-white gap-4 ">
        <div className="font-bold">Get Started</div>
        <div className="flex justify-center items-center space-x-4 mt-4">
          <Link to="/login">
            <button className="bg-blue-600 text-white font-medium rounded-4xl px-8 py-3 text-lg shadow-md hover:bg-blue-700 transition w-[200px]">
              Log in
            </button>
          </Link>
          <Link to="/signup">
            <button className="bg-blue-600 text-white font-medium rounded-full px-8 py-3 text-lg shadow-md hover:bg-blue-700 transition w-[200px]">
              Sign up
            </button>
          </Link>
        </div>
        <Link to={"/chat"}>
          <div className=" border-0 rounded-full text-xs m-4 font-bold hover:bg-gray-900 p-4">
            Try it first
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Landing;
