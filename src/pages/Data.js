import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { auth, db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
// import { CSVLink } from "react-csv";
import Spinner from "../component/Spinner";
import * as XLSX from "xlsx";
import { json, useNavigate } from "react-router";

const jsonData = [
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ3",
    Name: "Asim Chaudhuri",
    Email: "kinobecha@gmail.com",
    MobileNumber: 9433900209,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ4",
    Name: "Indranil Majumder",
    Email: "indranil2013@gmail.com",
    MobileNumber: 9830678773,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ5",
    Name: "Anupam Pramanik",
    Email: "anupampramanikus@gmail.com",
    MobileNumber: 9836229295,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ6",
    Name: "Animesh Mandal",
    Email: "animesh2788@rediffmail.com",
    MobileNumber: 9158856680,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ7",
    Name: "Sujatha",
    Email: "sujathapanigrahi75@gmail.com",
    MobileNumber: 9490100734,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ8",
    Name: "Bramha Reddy",
    Email: "brr1951@gmail.com",
    MobileNumber: 995982887,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ9",
    Name: "Johan",
    Email: "johanbabu9@gmail.com",
    MobileNumber: 9949177588,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ10",
    Name: "Ayan Banerjee",
    Email: "ayan42572@gmail.com",
    MobileNumber: 6289739993,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ11",
    Name: "Sohon Chakraborty ",
    Email: "sohonchakraborty2022@gmail.com",
    MobileNumber: 8334806833,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ12",
    Name: "Sakya Kundu",
    Email: "sakyakundu156@gmail.com",
    MobileNumber: 6290559275,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ13",
    Name: "Jisan Ahi",
    Email: "jisanahi605@gmail.com",
    MobileNumber: 9062796089,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ14",
    Name: "Sovik Paul",
    Email: "souvikpaul2020@gmail.com",
    MobileNumber: 8777252030,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ15",
    Name: "Kaushik Halder",
    Email: "imkaushik81@gmail.com",
    MobileNumber: 8981727363,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ16",
    Name: "Soumi Thakur Chakraborty ",
    Email: "soumi.titly.tc@gmail.com",
    MobileNumber: 7980910259,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ17",
    Name: "Utso Majumder",
    Email: "utsomajumder@gmail.com",
    MobileNumber: 9051964619,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ18",
    Name: "Pooja Das Sarkar",
    Email: "pooja.dassarkar@gmail.com",
    MobileNumber: 9920995560,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ19",
    Name: "Vimal Mylon",
    Email: "vimal.mylon@gmail.com",
    MobileNumber: 9619100432,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ20",
    Name: "Tanaghna Ray",
    Email: "tanaghnaroy@gmail.com",
    MobileNumber: 8240606794,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ21",
    Name: "Tushar Chakraborty",
    Email: "tusharchakraborty@gmail.com",
    MobileNumber: 6290329311,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ22",
    Name: "Damayanti Saha",
    Email: "damayantisaha@gmail.com",
    MobileNumber: 8420180968,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ23",
    Name: "Kenneth Cyrus",
    Email: "Kennethcyrus@gmail.com",
    MobileNumber: 7987936148,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ24",
    Name: "Gouri Dey",
    Email: "gourideyiti@gmail.com",
    MobileNumber: 8902198859,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ25",
    Name: "Prasun Roy",
    Email: "prasunroy@rediffmail.com",
    MobileNumber: 9732060837,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ26",
    Name: "Tharna Roy",
    Email: "tharnaroy@gmail.com",
    MobileNumber: 9434845383,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ27",
    Name: "Tamali Biswas",
    Email: "tamalibiswas2001@gmail.com",
    MobileNumber: 9051081902,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ28",
    Name: "Soumil Guha",
    Email: "soumilguha077@gmail.com",
    MobileNumber: 9007521192,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ29",
    Name: "Gourav Datta",
    Email: "gouravdatta@rediffmail.com",
    MobileNumber: 9231571213,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ30",
    Name: "Mousumi Roy Chowdhury",
    Email: "mousumicp@gmail.com",
    MobileNumber: 6290040648,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ31",
    Name: "Pathikrit Guha",
    Email: "pathikrit310@gmail.com",
    MobileNumber: 9330190811,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ32",
    Name: "Gopi Aika",
    Email: "gopiaika71@gmail.com",
    MobileNumber: 8240221514,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ33",
    Name: "Dhritiman Mondal",
    Email: "dhritimanmondal2@gmail.com",
    MobileNumber: 9748939708,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ34",
    Name: "Debayan Mukherjee",
    Email: "debayan252521@gmail.com",
    MobileNumber: 9831018782,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ35",
    Name: "Srinjita Gupta",
    Email: "srinjitagupta21@gmail.com",
    MobileNumber: 8240659026,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ36",
    Name: "Dwaipayan Hira",
    Email: "dwaipayanhira65@gmail.com",
    MobileNumber: 9330073380,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ37",
    Name: "Bansha Sarkar ",
    Email: "sarkarbansha0801@gmail.com",
    MobileNumber: 7003570782,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ38",
    Name: "Atanu Roy ",
    Email: "atanuroyofficial@gmail.com",
    MobileNumber: 8334046481,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ39",
    Name: "Nandita Bagchi ",
    Email: "nanditabagchi2004@gmail.com",
    MobileNumber: 8777670645,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ40",
    Name: "Supratip Sinha",
    Email: "suprasinha2004@gmail.com",
    MobileNumber: 8697329200,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ41",
    Name: "Rounak Halder",
    Email: "rounakhalder2207@gmail.com",
    MobileNumber: 9875650738,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ42",
    Name: "Arghodeep Gupta",
    Email: "arghodeepgupta940@gmail.com",
    MobileNumber: 7980320507,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ43",
    Name: "Aishwariya Ghosh",
    Email: "aishwariyaghosh01@gmail.com",
    MobileNumber: 9123867504,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ44",
    Name: "Adrija Kundu",
    Email: "adrija.kundu10@gmail.com",
    MobileNumber: 9330344207,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ45",
    Name: "Sarthak Pramanik ",
    Email: "sarthakttrockz@gmail.com",
    MobileNumber: 8910750351,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ46",
    Name: "Aniruddha Halder",
    Email: "aniruddhahalder25@gmail.com",
    MobileNumber: 8585850297,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ47",
    Name: "Papri Das",
    Email: "daspapri264@gmail.com",
    MobileNumber: 6291159475,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ48",
    Name: "Soudita Sen",
    Email: "souditasen0211@gmail.com",
    MobileNumber: 6290771726,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ49",
    Name: "Nawal Tharad",
    Email: "nawaltharad@gmail.com",
    MobileNumber: 9831150880,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ50",
    Name: "Riju Basu",
    Email: "rijubasu@gmail.com",
    MobileNumber: 9831256404,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ51",
    Name: "Paramita Bhattacharjee ",
    Email: "b.paramita1967@gmail.com",
    MobileNumber: 9433786562,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ52",
    Name: "Rahul Das",
    Email: "rahuldas1828@gmail.com",
    MobileNumber: 8981586638,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ53",
    Name: "Sudipto Basak",
    Email: "sb_27775@hotmail.com",
    MobileNumber: 9748672732,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ54",
    Name: "Tareenkah Ghosh",
    Email: "ghoshtk007@gmail.com",
    MobileNumber: 9433904389,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ55",
    Name: "Dheeresh Sainie",
    Email: "dhireshsainie@gmail.com",
    MobileNumber: 9728079191,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ56",
    Name: "Tapan Kumar Saha",
    Email: "kumarsahatapan@gmail.com",
    MobileNumber: 9432316608,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ57",
    Name: "Pritysha Maity",
    Email: "prityshamaity@gmail.com",
    MobileNumber: 9051089298,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ58",
    Name: "Sukanta Ghosh",
    Email: "ghoshsukanta37@gmail.com",
    MobileNumber: 7278833628,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ59",
    Name: "Amit Kumar Jha",
    Email: "amitkj014@gmail.com",
    MobileNumber: 8621006848,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ60",
    Name: "Asis Chakraborty",
    Email: "achak.52@gmail.com",
    MobileNumber: 9674627366,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ61",
    Name: "Dipan Saha",
    Email: "dipsi.saha894@gmail.com",
    MobileNumber: 8017376953,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ62",
    Name: "Hansha Roy",
    Email: "hansharoy.main@gmail.com",
    MobileNumber: 6360126540,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ63",
    Name: "Hiya Mukherjee",
    Email: "hiya.mukherjee.b@outlook.com",
    MobileNumber: 4702876127,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ64",
    Name: "Rcch Khan Roy",
    Email: "rech.ray245@gmail.com",
    MobileNumber: 9432470806,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ65",
    Name: "Gourab Naskar",
    Email: "gaurabnaskar66@gmail.com",
    MobileNumber: 6291547849,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ66",
    Name: "Samanurita Datta",
    Email: "thca.swati@gmail.com",
    MobileNumber: 9038084945,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ67",
    Name: "Ivaan Gupta",
    Email: "ivaanzone@gmail.com",
    MobileNumber: 9831317755,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ68",
    Name: "Sabit Hussain",
    Email: "sabithussain78@gmail.com",
    MobileNumber: 6295048291,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ69",
    Name: "Anubrata Gomes",
    Email: "gomes.anubrata@gmail.com",
    MobileNumber: 9804376881,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ70",
    Name: "Gopal Chakraborty",
    Email: "gopalputu@gmail.com",
    MobileNumber: 9830751740,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ71",
    Name: "Prabhat Mandal",
    Email: "prabhat.mandal@saha.ac.in",
    MobileNumber: 7044682899,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ72",
    Name: "Sudeshna ",
    Email: "letter.sudeshna@gmail.com",
    MobileNumber: 9830401810,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ73",
    Name: "Farha",
    Email: "nahraf404@gmail.com ",
    MobileNumber: 9205720723,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ74",
    Name: "Sushanta Das",
    Email: "susantadas0409@gmail.com",
    MobileNumber: 6291581822,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ75",
    Name: "Uttam Bhattacharyya ",
    Email: "uttambhattacharyy@gmail.com",
    MobileNumber: 8777723467,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ76",
    Name: "Aniruddha Dutta",
    Email: "aniruddhad84@gmail.com",
    MobileNumber: 9830111630,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ77",
    Name: "Palak Mallick",
    Email: "palakmallick45492@gmail.com",
    MobileNumber: 9051601747,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ78",
    Name: "Ankush Ghosh",
    Email: "ankushghosh500@gmail.com",
    MobileNumber: 6291032989,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ79",
    Name: "Debjani Goswami",
    Email: "goswamidebjani2000@gmail.com",
    MobileNumber: 9163110214,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ80",
    Name: "Bijoy Kumar Shaw",
    Email: "bijoykumar2096@gmail.com",
    MobileNumber: 8250224242,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ81",
    Name: "Supriya Chatterjee",
    Email: "ch.supriya@gmail.com",
    MobileNumber: 9836382041,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ82",
    Name: "Binayak Debnath",
    Email: "binayakdebnath@gmail.com",
    MobileNumber: 9432012797,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ83",
    Name: "Diptgesh Bhattacharya",
    Email: "diptgesh@gmail.com",
    MobileNumber: 7003092503,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ84",
    Name: "Sudipto Mitra",
    Email: "sudipto.mitra.2017@gmail.com",
    MobileNumber: 8910320060,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ85",
    Name: "Umang Vyas",
    Email: "umangdce@gmail.com",
    MobileNumber: 7600404535,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ86",
    Name: "Sima Biswas",
    Email: "punisher.bachu@gmail.com",
    MobileNumber: 9943996324,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ87",
    Name: "Bidisha Mondal",
    Email: "bidisha.mondal@gmail.com",
    MobileNumber: 9674366436,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ88",
    Name: "Dr.S.A.Amin",
    Email: "pharmacist.amin@gmail.com",
    MobileNumber: 9735801725,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ89",
    Name: "Sakhrith Chakraborty",
    Email: "pharmacist.amin@gmail.com",
    MobileNumber: 6291972922,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ90",
    Name: "Somjit Das",
    Email: "somjitd88@gmail.com",
    MobileNumber: 8584804734,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ91",
    Name: "Anjan Das",
    Email: "somjitd88@gmail.com",
    MobileNumber: 9748368242,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ92",
    Name: "Sekhar Sarkar",
    Email: "sarkarsekhar22@gmail.com",
    MobileNumber: 8013539831,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ93",
    Name: "Rahul Roy Chowdhury",
    Email: "mailmeroyrahul@rediffmail.com",
    MobileNumber: 9874880230,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ94",
    Name: "D.K. Bhattacharjee ",
    Email: "dkbhattacharjee@gmail.com",
    MobileNumber: 9874880230,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ95",
    Name: "Tridibesh Dey",
    Email: "tridibesh.dey59@gmail.com",
    MobileNumber: 9836109654,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ96",
    Name: "Tarita Roy Chowdhury",
    Email: "taritar95@gmail.com",
    MobileNumber: 9073322393,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ97",
    Name: "Ridhima Talukder",
    Email: "ridhimatalukder@gmail.com",
    MobileNumber: 9051553542,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ98",
    Name: "Shaunak",
    Email: "shaunak304@gmail.com",
    MobileNumber: 9051553542,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ99",
    Name: "Ayan Banerjee",
    Email: "ayan42572@gmail.com",
    MobileNumber: 6289739993,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ100",
    Name: "M.Roy",
    Email: "ayan42572@gmail.com",
    MobileNumber: 9434407171,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ101",
    Name: "S.Basu",
    Email: "ayan42572@gmail.com",
    MobileNumber: 9433126918,
    Password: 123456,
  },
  {
    RotaryID: "UndWToKozWhGMa4hLJpaCNjzAWJ102",
    Name: "Devyani Sen",
    Email: "devyanisen99@gmail.com",
    MobileNumber: 9875319608,
    Password: 123456,
  },
];

function Data() {
  const [userdata, setUserdata] = useState({});
  const [showData, setShowData] = useState(jsonData);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchListings() {
      try {
        const listingRef = collection(db, "users");
        const querySnap = await getDocs(listingRef);
        // setLastFetchListing(lastVisible);
        const docs = querySnap.docs.map((doc) => {
          const data = doc.data();
          data.id = doc.id;
          return data;
        });
        // let listings = [];
        // querySnap.forEach((doc) => {
        //   return listings.push({
        //     id: doc.id,
        //     data: doc.data(),
        //   });
        // });
        // setUserdata(listings);
        setLoading(false);
        setUserdata(docs);

        console.log(docs);
        console.log(showData);
      } catch (error) {
        console.log("Could not fetch listing");
      }
    }
    console.log(userdata);
    fetchListings();
  }, []);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigate("/");
      })
      .catch((error) => alert(error.message));
  };

  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(showData);
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "old_users.xlsx");
  };
  const exportToExcell = () => {
    const flattenedData = userdata.map((obj) => {
      const history = obj.History;
      delete obj.History;
      return Object.entries(history).reduce((acc, [key, value]) => {
        return {
          ...acc,
          [`${key}_date`]: value.date,
          [`${key}_amount`]: value.amount,
        };
      }, obj);
    });

    const wb = XLSX.utils.book_new();

    // Convert the flattened data to a worksheet
    const ws = XLSX.utils.json_to_sheet(flattenedData);
    console.log(flattenedData);

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    // Save the workbook as an Excel file
    XLSX.writeFile(wb, "new_users.xlsx");
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="m-10 flex flex-col justify-center text-xs text-center my-6">
      <p className="text-5xl mb-8">ADMIN PANEL</p>
      <div className="space-x-3">
        <button
          className="text-2xl border w-[47%] border-blue-600 bg-blue-700 text-white items-center justify-center text-center mb-5 rounded-lg"
          onClick={exportToExcel}
        >
          Old Users
        </button>
        <button
          className="text-2xl border w-[47%] border-blue-600 bg-blue-700 text-white items-center justify-center text-center mb-5 rounded-lg"
          onClick={exportToExcell}
        >
          New Users
        </button>
      </div>
      <p className="text-xl">This is the JSON data</p>
      <div>
        {showData && <pre>{JSON.stringify(showData, null, 2)}</pre>}
        {userdata && <pre>{JSON.stringify(userdata, null, 2)}</pre>}
      </div>
      <div>
        <button
          className="w-[40%] align-center bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase shadow-md rounded hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800 mt-5"
          onClick={handleSignOut}
        >
          Sign out
        </button>
      </div>
    </div>
  );
}

export default Data;
