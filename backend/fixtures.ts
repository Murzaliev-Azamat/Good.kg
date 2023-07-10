import crypto from "crypto";
import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";
import Artist from "./models/Artist";
import Album from "./models/Album";
import Track from "./models/Track";
import Category from "./models/Category";
import Company from "./models/Company";
import Promotion from "./models/Promotion";

const run = async () => {
  mongoose.set("strictQuery", false);
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection("albums");
    await db.dropCollection("artists");
    // await db.dropCollection("trackhistories");
    await db.dropCollection("tracks");
    await db.dropCollection("users");
    await db.dropCollection("promotions");
    await db.dropCollection("companies");
    await db.dropCollection("categories");
  } catch (e) {
    console.log("Collections were not present, skipping drop...");
  }

  const [eat, hobbies, animals] = await Category.create(
    {
      title: "Поесть и попить",
      parent: null,
    },
    {
      title: "Развлечения",
      parent: null,
    },
    {
      title: "Животные",
      parent: null,
    }
  );

  const [bars, cafes, karaoke] = await Category.create(
    {
      title: "Бары",
      parent: eat._id,
    },
    {
      title: "Кафе",
      parent: eat._id,
    },
    {
      title: "Караоке",
      parent: hobbies._id,
    }
  );

  const [imperiya, karaoke1, karaoke2, karaoke3, ferma1, ferma2, ferma3] =
    await Company.create(
      {
        title: "Империя пиццы",
        categories: [eat._id, cafes._id],
        description:
          "ТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляля",
        image: "fixtures/imperiya.jpeg",
        link: "https://www.instagram.com/mypizzakg/",
      },
      {
        title: "Караоке1",
        categories: [hobbies._id, karaoke._id],
        description:
          "ТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляля",
        image: "fixtures/karaoke.png",
        link: "https://www.instagram.com/mypizzakg/",
      },
      {
        title: "Караоке2",
        categories: [hobbies._id, karaoke._id],
        description:
          "ТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляля",
        image: "fixtures/karaoke.png",
        link: "https://www.instagram.com/mypizzakg/",
      },
      {
        title: "Караоке3",
        categories: [hobbies._id, karaoke._id],
        description:
          "ТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляля",
        image: "fixtures/karaoke.png",
        link: "https://www.instagram.com/mypizzakg/",
      },
      {
        title: "Ferma1",
        categories: [animals._id],
        description:
          "ТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляля",
        image: "fixtures/karaoke.png",
        link: "https://www.instagram.com/mypizzakg/",
      },
      {
        title: "Ferma2",
        categories: [animals._id],
        description:
          "ТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляля",
        image: "fixtures/karaoke.png",
        link: "https://www.instagram.com/mypizzakg/",
      },
      {
        title: "Ferma3",
        categories: [animals._id],
        description:
          "ТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляля",
        image: "fixtures/karaoke.png",
        link: "https://www.instagram.com/mypizzakg/",
      }
    );

  await Promotion.create(
    {
      title: "Бутылка колы в подарок",
      company: imperiya._id,
      description:
        "ТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляля",
      image: "fixtures/cola.webp",
      createdAt: new Date(),
    },
    {
      title: "Виски в подарок",
      company: karaoke1._id,
      description:
        "ТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляля",
      image: "fixtures/viski.jpeg",
      link: "https://www.instagram.com/mypizzakg/",
      createdAt: new Date(),
    },
    {
      title: "Fanta в подарок",
      company: karaoke2._id,
      description:
        "ТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляля",
      image: "fixtures/fanta.webp",
      link: "https://www.instagram.com/mypizzakg/",
      createdAt: new Date(),
    },
    {
      title: "Sprite в подарок",
      company: karaoke3._id,
      description:
        "ТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляля",
      image: "fixtures/sprite.jpeg",
      link: "https://www.instagram.com/mypizzakg/",
      createdAt: new Date(),
    },
    {
      title: "Chiken в подарок",
      company: ferma1._id,
      description:
        "ТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляля",
      image: "fixtures/chiken.jpeg",
      link: "https://www.instagram.com/mypizzakg/",
      createdAt: new Date(),
    },
    {
      title: "Milk в подарок",
      company: ferma2._id,
      description:
        "ТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляля",
      image: "fixtures/milk.jpeg",
      link: "https://www.instagram.com/mypizzakg/",
      createdAt: new Date(),
    },
    {
      title: "Eggs в подарок",
      company: ferma3._id,
      description:
        "ТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляля",
      image: "fixtures/eggs.jpeg",
      link: "https://www.instagram.com/mypizzakg/",
      createdAt: new Date(),
    },
    {
      title: "Бутылка колы в подарок",
      company: imperiya._id,
      description:
        "ТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляля",
      image: "fixtures/test.jpeg",
      createdAt: new Date(),
    },
    {
      title: "Виски в подарок",
      company: karaoke1._id,
      description:
        "ТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляля",
      image: "fixtures/test.jpeg",
      link: "https://www.instagram.com/mypizzakg/",
      createdAt: new Date(),
    },
    {
      title: "Fanta в подарок",
      company: karaoke2._id,
      description:
        "ТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляля",
      image: "fixtures/test.jpeg",
      link: "https://www.instagram.com/mypizzakg/",
      createdAt: new Date(),
    },
    {
      title: "Sprite в подарок",
      company: karaoke3._id,
      description:
        "ТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляля",
      image: "fixtures/test.jpeg",
      link: "https://www.instagram.com/mypizzakg/",
      createdAt: new Date(),
    },
    {
      title: "Chiken в подарок",
      company: ferma1._id,
      description:
        "ТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляля",
      image: "fixtures/test.jpeg",
      link: "https://www.instagram.com/mypizzakg/",
      createdAt: new Date(),
    },
    {
      title: "Milk в подарок",
      company: ferma2._id,
      description:
        "ТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляля",
      image: "fixtures/test.jpeg",
      link: "https://www.instagram.com/mypizzakg/",
      createdAt: new Date(),
    },
    {
      title: "Eggs в подарок",
      company: ferma3._id,
      description:
        "ТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляля",
      image: "fixtures/test.jpeg",
      link: "https://www.instagram.com/mypizzakg/",
      createdAt: new Date(),
    },
    {
      title: "Бутылка колы в подарок",
      company: imperiya._id,
      description:
        "ТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляля",
      image: "fixtures/test.jpeg",
      createdAt: new Date(),
    },
    {
      title: "Виски в подарок",
      company: karaoke1._id,
      description:
        "ТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляля",
      image: "fixtures/test.jpeg",
      link: "https://www.instagram.com/mypizzakg/",
      createdAt: new Date(),
    },
    {
      title: "Fanta в подарок",
      company: karaoke2._id,
      description:
        "ТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляля",
      image: "fixtures/test.jpeg",
      link: "https://www.instagram.com/mypizzakg/",
      createdAt: new Date(),
    },
    {
      title: "Sprite в подарок",
      company: karaoke3._id,
      description:
        "ТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляля",
      image: "fixtures/test.jpeg",
      link: "https://www.instagram.com/mypizzakg/",
      createdAt: new Date(),
    },
    {
      title: "Chiken в подарок",
      company: ferma1._id,
      description:
        "ТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляля",
      image: "fixtures/test.jpeg",
      link: "https://www.instagram.com/mypizzakg/",
      createdAt: new Date(),
    },
    {
      title: "Milk в подарок",
      company: ferma2._id,
      description:
        "ТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляля",
      image: "fixtures/test.jpeg",
      link: "https://www.instagram.com/mypizzakg/",
      createdAt: new Date(),
    },
    {
      title: "Eggs в подарок",
      company: ferma3._id,
      description:
        "ТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляля",
      image: "fixtures/test.jpeg",
      link: "https://www.instagram.com/mypizzakg/",
      createdAt: new Date(),
    },
    {
      title: "Бутылка колы в подарок",
      company: imperiya._id,
      description:
        "ТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляля",
      image: "fixtures/test.jpeg",
      createdAt: new Date(),
    },
    {
      title: "Виски в подарок",
      company: karaoke1._id,
      description:
        "ТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляля",
      image: "fixtures/test.jpeg",
      link: "https://www.instagram.com/mypizzakg/",
      createdAt: new Date(),
    },
    {
      title: "Fanta в подарок",
      company: karaoke2._id,
      description:
        "ТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляля",
      image: "fixtures/test.jpeg",
      link: "https://www.instagram.com/mypizzakg/",
      createdAt: new Date(),
    },
    {
      title: "Sprite в подарок",
      company: karaoke3._id,
      description:
        "ТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляля",
      image: "fixtures/test.jpeg",
      link: "https://www.instagram.com/mypizzakg/",
      createdAt: new Date(),
    },
    {
      title: "Chiken в подарок",
      company: ferma1._id,
      description:
        "ТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляля",
      image: "fixtures/test.jpeg",
      link: "https://www.instagram.com/mypizzakg/",
      createdAt: new Date(),
    },
    {
      title: "Milk в подарок",
      company: ferma2._id,
      description:
        "ТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляля",
      image: "fixtures/test.jpeg",
      link: "https://www.instagram.com/mypizzakg/",
      createdAt: new Date(),
    },
    {
      title: "Eggs в подарок",
      company: ferma3._id,
      description:
        "ТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляляТраляля",
      image: "fixtures/test.jpeg",
      link: "https://www.instagram.com/mypizzakg/",
      createdAt: new Date(),
    }
  );

  const [eminem, madonna] = await Artist.create(
    {
      name: "Eminem",
      image: "fixtures/eminem.jpg",
      info: "Rap singer",
    },
    {
      name: "Madonna",
      image: "fixtures/madonna.jpg",
      info: "Pop singer",
    }
  );

  const [theEminemShow, encore, americanLife, trueBlue] = await Album.create(
    {
      name: "Encore",
      year: 2004,
      artist: eminem._id,
      image: "fixtures/encore.jpg",
    },
    {
      name: "The Eminem Show",
      year: 2002,
      artist: eminem._id,
      image: "fixtures/the_eminem_show.jpg",
    },
    {
      name: "American Life",
      year: 2003,
      artist: madonna._id,
      image: "fixtures/american_life.jpg",
    },
    {
      name: "True Blue",
      year: 1986,
      artist: madonna._id,
      image: "fixtures/true_blue.jpg",
    }
  );

  await Track.create(
    {
      name: "White America",
      time: "3:14",
      album: theEminemShow._id,
      trackNumber: 1,
      linkToYoutube: "bi-8QeEm0HM",
    },
    {
      name: "Business",
      time: "3:15",
      album: theEminemShow._id,
      trackNumber: 3,
    },
    {
      name: "Soldier",
      time: "2:18",
      album: theEminemShow._id,
      trackNumber: 2,
      linkToYoutube: "HOCdIG3mq1U",
    },
    {
      name: "Say Goodbye Hollywood",
      time: "3:22",
      album: theEminemShow._id,
      trackNumber: 4,
    },
    {
      name: "Without Me",
      time: "3:25",
      album: theEminemShow._id,
      trackNumber: 5,
    },
    {
      name: "Evil Deeds",
      time: "3:16",
      album: encore._id,
      trackNumber: 1,
    },
    {
      name: "Mosh",
      time: "3:15",
      album: encore._id,
      trackNumber: 4,
    },
    {
      name: "Rain Man",
      time: "3:11",
      album: encore._id,
      trackNumber: 3,
    },
    {
      name: "Just Lose It",
      time: "3:18",
      album: encore._id,
      trackNumber: 2,
    },
    {
      name: "Mockingbird",
      time: "3:40",
      album: encore._id,
      trackNumber: 5,
    },
    {
      name: "Frozen",
      time: "3:33",
      album: americanLife._id,
      trackNumber: 5,
      linkToYoutube: "XS088Opj9o0",
    },
    {
      name: "Hollywood",
      time: "3:35",
      album: americanLife._id,
      trackNumber: 4,
    },
    {
      name: "Love Profusion",
      time: "3:39",
      album: americanLife._id,
      trackNumber: 3,
    },
    {
      name: "Nothing Fails",
      time: "3:05",
      album: americanLife._id,
      trackNumber: 2,
    },
    {
      name: "Intervention",
      time: "3:07",
      album: americanLife._id,
      trackNumber: 1,
    },
    {
      name: "Open Your Heart",
      time: "3:11",
      album: trueBlue._id,
      trackNumber: 4,
    },
    {
      name: "White Heat",
      time: "3:15",
      album: trueBlue._id,
      trackNumber: 3,
    },
    {
      name: "Live to Tell",
      time: "3:19",
      album: trueBlue._id,
      trackNumber: 5,
    },
    {
      name: "Where’s the Party",
      time: "3:58",
      album: trueBlue._id,
      trackNumber: 2,
    },
    {
      name: "La Isla Bonita",
      time: "3:47",
      album: trueBlue._id,
      trackNumber: 1,
    }
  );

  await User.create(
    {
      username: "Azamat",
      password: "12345",
      displayName: "Aza",
      token: crypto.randomUUID(),
    },
    {
      username: "Adilet",
      password: "333",
      displayName: "Adik",
      token: crypto.randomUUID(),
      role: "admin",
    }
  );

  await db.close();
};

void run();
