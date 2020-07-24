const express = require('express')
const app = express()
const port = 3031;
const bodyParser = require("body-parser");
const multer  = require('multer')
const cors = require('cors');
// Original key used
//const hellosign = require('hellosign-sdk')({key: 'f8bfbc4614bfe9a27a2d3dc30470134b1e14c7f817d68f21cae350269e8da1a4'});
const hellosign = require('hellosign-sdk')({key: '716e224a390c9fd95840b9c82e50638389d408504635295529733141c4f654a5'});
// Temp key
//const hellosign = require('hellosign-sdk')({key: '79660b460386a3a236fab90067798a9ac5f4668adeb0e9aa9cfb5559026cdc8d'});
var upload = multer();
const axios = require('axios')
const router = express.Router();

// These are manufacturers by ID's
var manufacturer = {
    507: 'PSG',
    507: 'Elephant',
    368: 'Eagle',
    44: 'CarolinaCarports',
    420: 'SBS',
    47: 'Interstate',
    45: 'American',
    45: 'AmericanCAShop',
    618: 'CarportNetwork',
    46: 'Dreams',
    48: 'WestCoast',
    395: 'TriStateCarports',
    //507: 'TriStateCarports',
    571: 'QualityCarports',
    //507: 'QualityCarports',
    610: 'Midwest',
    //507: 'Midwest',
    613: 'Lonestar'
    //507: 'Lonestar'
};

//forms
var forms = {
    PSG: 'https://carport.com/api/documents/PSG-ORDER-FORM-190801-2BD-WEB-SPA.pdf',
    Elephant: 'https://carport.com/api/documents/_ELEPHANT-ORDER-FORM-16DD-WEB-SPA.pdf',
    Eagle: 'https://carport.com/api/documents/_EAGLE-ORDER-CONTRACT.pdf',
    EagleFL: 'https://carport.com/api/documents/_EAGLE-FL-USA-Steel-Contract.pdf',
    CarolinaCarports: 'https://carport.com/api/documents/_UPDATED_CCI_CONTRACT_AUG_2018.pdf',
    SBS: 'https://carport.com/api/documents/_SBS_CONTRACT_FORM.pdf',
    Interstate: 'https://carport.com/api/documents/_INTERSTATE_STEEL_ORDER_FORM.pdf',
    American: 'https://carport.com/api/documents/_AMERICAN_ORDER_FORM-PA-TX-NM-IL-IN.pdf',
    AmericanCAShop: 'https://carport.com/api/documents/_AMERICAN_ORDER_FORM-PA-TX-NM-IL-IN.pdf',
    CarportNetwork: 'https://carport.com/api/documents/_TCN_Contract.pdf',
    Dreams: 'https://carport.com/api/documents/_DREAMS_CONTRACT.pdf',
    WestCoast: 'https://carport.com/api/documents/_WCMB_CONTRACT_FORM.pdf',
    TriStateCarports: 'https://carport.com/api/documents/_TRI-STATE_ORDER_FORM.pdf',
    QualityCarports: 'https://carport.com/api/documents/_QUALITY_CARPORTS_CONTRACT.pdf',
    Midwest: 'https://carport.com/api/documents/_MIDWEST_ORDER_FORM.pdf',
    Lonestar: 'https://carport.com/api/documents/_LONESTAR_ORDER_FORM.pdf'
};

var buildingExtended = 'https://carport.com/api/documents/_BUILDING-ORDER-FORM-SPA-EXTENDED-3DD-FORM.pdf';
var buildingExtendedFields = [
    {"api_id":"buicef10_1","name":"qty20","type":"text-merge","x":118,"y":81,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_2","name":"line20","type":"text-merge","x":148,"y":81,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_3","name":"price20","type":"text-merge","x":482,"y":81,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_4","name":"qty21","type":"text-merge","x":118,"y":94,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_5","name":"qty22","type":"text-merge","x":118,"y":108,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_6","name":"qty23","type":"text-merge","x":118,"y":122,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_7","name":"qty24","type":"text-merge","x":118,"y":135,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_8","name":"line21","type":"text-merge","x":148,"y":94,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_9","name":"line22","type":"text-merge","x":148,"y":108,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_10","name":"line23","type":"text-merge","x":148,"y":122,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_11","name":"line24","type":"text-merge","x":148,"y":135,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_12","name":"price21","type":"text-merge","x":482,"y":94,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_13","name":"price22","type":"text-merge","x":482,"y":108,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_14","name":"price23","type":"text-merge","x":482,"y":122,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_15","name":"price24","type":"text-merge","x":482,"y":135,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_16","name":"qty25","type":"text-merge","x":118,"y":149,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_17","name":"qty26","type":"text-merge","x":118,"y":163,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_18","name":"qty27","type":"text-merge","x":118,"y":176,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_19","name":"qty28","type":"text-merge","x":118,"y":190,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_20","name":"qty29","type":"text-merge","x":118,"y":204,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_21","name":"qty30","type":"text-merge","x":118,"y":217,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_22","name":"qty31","type":"text-merge","x":118,"y":231,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_23","name":"qty32","type":"text-merge","x":118,"y":245,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_24","name":"qty33","type":"text-merge","x":118,"y":258,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_25","name":"qty34","type":"text-merge","x":118,"y":272,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_26","name":"qty35","type":"text-merge","x":118,"y":286,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_27","name":"qty36","type":"text-merge","x":118,"y":299,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_28","name":"qty37","type":"text-merge","x":118,"y":313,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_29","name":"qty38","type":"text-merge","x":118,"y":327,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_30","name":"qty39","type":"text-merge","x":118,"y":340,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_31","name":"qty40","type":"text-merge","x":118,"y":354,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_32","name":"line25","type":"text-merge","x":148,"y":149,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_33","name":"line26","type":"text-merge","x":148,"y":163,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_34","name":"line27","type":"text-merge","x":148,"y":176,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_35","name":"line28","type":"text-merge","x":148,"y":190,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_36","name":"line29","type":"text-merge","x":148,"y":204,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_37","name":"line30","type":"text-merge","x":148,"y":217,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_38","name":"line31","type":"text-merge","x":148,"y":231,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_39","name":"line32","type":"text-merge","x":148,"y":245,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_40","name":"line33","type":"text-merge","x":148,"y":258,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_41","name":"line34","type":"text-merge","x":148,"y":272,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_42","name":"line35","type":"text-merge","x":148,"y":286,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_43","name":"line36","type":"text-merge","x":148,"y":299,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_44","name":"line37","type":"text-merge","x":148,"y":313,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_45","name":"line38","type":"text-merge","x":148,"y":327,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_46","name":"line39","type":"text-merge","x":148,"y":340,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_47","name":"line40","type":"text-merge","x":148,"y":354,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_48","name":"price25","type":"text-merge","x":482,"y":149,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_49","name":"price26","type":"text-merge","x":482,"y":163,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_50","name":"price27","type":"text-merge","x":482,"y":176,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_51","name":"price28","type":"text-merge","x":482,"y":190,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_52","name":"price29","type":"text-merge","x":482,"y":204,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_53","name":"price30","type":"text-merge","x":482,"y":217,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_54","name":"price31","type":"text-merge","x":482,"y":231,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_55","name":"price32","type":"text-merge","x":482,"y":245,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_56","name":"price33","type":"text-merge","x":482,"y":258,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_58","name":"price34","type":"text-merge","x":482,"y":272,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_59","name":"price35","type":"text-merge","x":482,"y":286,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_60","name":"price36","type":"text-merge","x":482,"y":299,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_61","name":"price37","type":"text-merge","x":482,"y":313,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_62","name":"price38","type":"text-merge","x":482,"y":327,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_63","name":"price39","type":"text-merge","x":482,"y":340,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_57","name":"price40","type":"text-merge","x":482,"y":354,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_64","name":"qty41","type":"text-merge","x":118,"y":368,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_65","name":"qty42","type":"text-merge","x":118,"y":381,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_66","name":"qty43","type":"text-merge","x":118,"y":395,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_67","name":"qty44","type":"text-merge","x":118,"y":409,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_68","name":"qty45","type":"text-merge","x":118,"y":422,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_69","name":"qty46","type":"text-merge","x":118,"y":436,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_70","name":"qty47","type":"text-merge","x":118,"y":450,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_71","name":"qty48","type":"text-merge","x":118,"y":464,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_72","name":"qty49","type":"text-merge","x":118,"y":477,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_73","name":"qty50","type":"text-merge","x":118,"y":491,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_74","name":"qty51","type":"text-merge","x":118,"y":505,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_75","name":"qty52","type":"text-merge","x":118,"y":518,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_76","name":"qty53","type":"text-merge","x":118,"y":532,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_77","name":"qty54","type":"text-merge","x":118,"y":546,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_78","name":"qty55","type":"text-merge","x":118,"y":559,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_79","name":"qty56","type":"text-merge","x":118,"y":573,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_80","name":"qty57","type":"text-merge","x":118,"y":587,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_81","name":"qty58","type":"text-merge","x":118,"y":600,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_82","name":"qty59","type":"text-merge","x":118,"y":614,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_83","name":"qty60","type":"text-merge","x":118,"y":628,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_84","name":"qty61","type":"text-merge","x":118,"y":642,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_85","name":"qty62","type":"text-merge","x":118,"y":656,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_86","name":"qty63","type":"text-merge","x":118,"y":670,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_87","name":"qty64","type":"text-merge","x":118,"y":683,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_88","name":"qty65","type":"text-merge","x":118,"y":697,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_89","name":"qty66","type":"text-merge","x":118,"y":711,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_90","name":"qty67","type":"text-merge","x":118,"y":724,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_91","name":"line41","type":"text-merge","x":148,"y":368,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_92","name":"line42","type":"text-merge","x":148,"y":381,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_93","name":"line43","type":"text-merge","x":148,"y":395,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_94","name":"line44","type":"text-merge","x":148,"y":409,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_95","name":"line45","type":"text-merge","x":148,"y":422,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_96","name":"line46","type":"text-merge","x":148,"y":436,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_97","name":"line47","type":"text-merge","x":148,"y":450,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_98","name":"line48","type":"text-merge","x":148,"y":464,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_99","name":"line49","type":"text-merge","x":148,"y":477,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_100","name":"line50","type":"text-merge","x":148,"y":491,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_101","name":"line51","type":"text-merge","x":148,"y":505,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_102","name":"line52","type":"text-merge","x":148,"y":518,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_103","name":"line53","type":"text-merge","x":148,"y":532,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_104","name":"line54","type":"text-merge","x":148,"y":546,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_105","name":"line55","type":"text-merge","x":148,"y":559,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_106","name":"line56","type":"text-merge","x":148,"y":573,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_107","name":"line57","type":"text-merge","x":148,"y":587,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_108","name":"line58","type":"text-merge","x":148,"y":600,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_109","name":"line59","type":"text-merge","x":148,"y":614,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_110","name":"line60","type":"text-merge","x":148,"y":628,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_111","name":"line61","type":"text-merge","x":148,"y":642,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_112","name":"line62","type":"text-merge","x":148,"y":656,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_113","name":"line63","type":"text-merge","x":148,"y":668,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_114","name":"line64","type":"text-merge","x":148,"y":684,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_115","name":"line65","type":"text-merge","x":148,"y":696,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_116","name":"line66","type":"text-merge","x":148,"y":710,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_117","name":"line67","type":"text-merge","x":148,"y":723,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_118","name":"price41","type":"text-merge","x":484,"y":368,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_119","name":"price42","type":"text-merge","x":483,"y":381,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_120","name":"price43","type":"text-merge","x":484,"y":395,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_121","name":"price44","type":"text-merge","x":485,"y":409,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_122","name":"price45","type":"text-merge","x":483,"y":422,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_123","name":"price46","type":"text-merge","x":484,"y":436,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_124","name":"price47","type":"text-merge","x":484,"y":450,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_125","name":"price48","type":"text-merge","x":484,"y":464,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_126","name":"price49","type":"text-merge","x":484,"y":477,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_127","name":"price50","type":"text-merge","x":485,"y":491,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_128","name":"price51","type":"text-merge","x":483,"y":505,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_129","name":"price52","type":"text-merge","x":485,"y":518,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_130","name":"price53","type":"text-merge","x":483,"y":532,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_131","name":"price54","type":"text-merge","x":485,"y":546,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_132","name":"price55","type":"text-merge","x":484,"y":559,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_133","name":"price56","type":"text-merge","x":483,"y":573,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_134","name":"price57","type":"text-merge","x":484,"y":587,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_135","name":"price58","type":"text-merge","x":483,"y":600,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_136","name":"price59","type":"text-merge","x":485,"y":614,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_137","name":"price60","type":"text-merge","x":484,"y":628,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_138","name":"price61","type":"text-merge","x":485,"y":643,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_139","name":"price62","type":"text-merge","x":485,"y":655,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_140","name":"price63","type":"text-merge","x":483,"y":669,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_141","name":"price64","type":"text-merge","x":483,"y":683,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_142","name":"price65","type":"text-merge","x":484,"y":696,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_143","name":"price66","type":"text-merge","x":484,"y":710,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_144","name":"price67","type":"text-merge","x":485,"y":724,"width":100,"height":16,"required":false,"signer":"sender","page":1}
];

var buildingExtendedFieldsSBS = [
    {"api_id":"buicef10_1","name":"qty18","type":"text-merge","x":118,"y":81,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_2","name":"line18","type":"text-merge","x":148,"y":81,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_3","name":"price18","type":"text-merge","x":482,"y":81,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_4","name":"qty19","type":"text-merge","x":118,"y":94,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_5","name":"qty20","type":"text-merge","x":118,"y":108,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_6","name":"qty21","type":"text-merge","x":118,"y":122,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_7","name":"qty22","type":"text-merge","x":118,"y":135,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_8","name":"line19","type":"text-merge","x":148,"y":94,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_9","name":"line20","type":"text-merge","x":148,"y":108,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_10","name":"line21","type":"text-merge","x":148,"y":122,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_11","name":"line22","type":"text-merge","x":148,"y":135,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_12","name":"price19","type":"text-merge","x":482,"y":94,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_13","name":"price20","type":"text-merge","x":482,"y":108,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_14","name":"price21","type":"text-merge","x":482,"y":122,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_15","name":"price22","type":"text-merge","x":482,"y":135,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_16","name":"qty23","type":"text-merge","x":118,"y":149,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_17","name":"qty26","type":"text-merge","x":118,"y":163,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_18","name":"qty27","type":"text-merge","x":118,"y":176,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_19","name":"qty28","type":"text-merge","x":118,"y":190,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_20","name":"qty29","type":"text-merge","x":118,"y":204,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_21","name":"qty30","type":"text-merge","x":118,"y":217,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_22","name":"qty31","type":"text-merge","x":118,"y":231,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_23","name":"qty32","type":"text-merge","x":118,"y":245,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_24","name":"qty33","type":"text-merge","x":118,"y":258,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_25","name":"qty34","type":"text-merge","x":118,"y":272,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_26","name":"qty35","type":"text-merge","x":118,"y":286,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_27","name":"qty36","type":"text-merge","x":118,"y":299,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_28","name":"qty37","type":"text-merge","x":118,"y":313,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_29","name":"qty38","type":"text-merge","x":118,"y":327,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_30","name":"qty39","type":"text-merge","x":118,"y":340,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_31","name":"qty40","type":"text-merge","x":118,"y":354,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_32","name":"line23","type":"text-merge","x":148,"y":149,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_33","name":"line26","type":"text-merge","x":148,"y":163,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_34","name":"line27","type":"text-merge","x":148,"y":176,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_35","name":"line28","type":"text-merge","x":148,"y":190,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_36","name":"line29","type":"text-merge","x":148,"y":204,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_37","name":"line30","type":"text-merge","x":148,"y":217,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_38","name":"line31","type":"text-merge","x":148,"y":231,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_39","name":"line32","type":"text-merge","x":148,"y":245,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_40","name":"line33","type":"text-merge","x":148,"y":258,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_41","name":"line34","type":"text-merge","x":148,"y":272,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_42","name":"line35","type":"text-merge","x":148,"y":286,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_43","name":"line36","type":"text-merge","x":148,"y":299,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_44","name":"line37","type":"text-merge","x":148,"y":313,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_45","name":"line38","type":"text-merge","x":148,"y":327,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_46","name":"line39","type":"text-merge","x":148,"y":340,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_47","name":"line40","type":"text-merge","x":148,"y":354,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_48","name":"price23","type":"text-merge","x":482,"y":149,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_49","name":"price26","type":"text-merge","x":482,"y":163,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_50","name":"price27","type":"text-merge","x":482,"y":176,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_51","name":"price28","type":"text-merge","x":482,"y":190,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_52","name":"price29","type":"text-merge","x":482,"y":204,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_53","name":"price30","type":"text-merge","x":482,"y":217,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_54","name":"price31","type":"text-merge","x":482,"y":231,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_55","name":"price32","type":"text-merge","x":482,"y":245,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_56","name":"price33","type":"text-merge","x":482,"y":258,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_58","name":"price34","type":"text-merge","x":482,"y":272,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_59","name":"price35","type":"text-merge","x":482,"y":286,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_60","name":"price36","type":"text-merge","x":482,"y":299,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_61","name":"price37","type":"text-merge","x":482,"y":313,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_62","name":"price38","type":"text-merge","x":482,"y":327,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_63","name":"price39","type":"text-merge","x":482,"y":340,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_57","name":"price40","type":"text-merge","x":482,"y":354,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_64","name":"qty41","type":"text-merge","x":118,"y":368,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_65","name":"qty42","type":"text-merge","x":118,"y":381,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_66","name":"qty43","type":"text-merge","x":118,"y":395,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_67","name":"qty44","type":"text-merge","x":118,"y":409,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_68","name":"qty45","type":"text-merge","x":118,"y":422,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_69","name":"qty46","type":"text-merge","x":118,"y":436,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_70","name":"qty47","type":"text-merge","x":118,"y":450,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_71","name":"qty48","type":"text-merge","x":118,"y":464,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_72","name":"qty49","type":"text-merge","x":118,"y":477,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_73","name":"qty50","type":"text-merge","x":118,"y":491,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_74","name":"qty51","type":"text-merge","x":118,"y":505,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_75","name":"qty52","type":"text-merge","x":118,"y":518,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_76","name":"qty53","type":"text-merge","x":118,"y":532,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_77","name":"qty54","type":"text-merge","x":118,"y":546,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_78","name":"qty55","type":"text-merge","x":118,"y":559,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_79","name":"qty56","type":"text-merge","x":118,"y":573,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_80","name":"qty57","type":"text-merge","x":118,"y":587,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_81","name":"qty58","type":"text-merge","x":118,"y":600,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_82","name":"qty59","type":"text-merge","x":118,"y":614,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_83","name":"qty60","type":"text-merge","x":118,"y":628,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_84","name":"qty61","type":"text-merge","x":118,"y":642,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_85","name":"qty62","type":"text-merge","x":118,"y":656,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_86","name":"qty63","type":"text-merge","x":118,"y":670,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_87","name":"qty64","type":"text-merge","x":118,"y":683,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_88","name":"qty65","type":"text-merge","x":118,"y":697,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_89","name":"qty66","type":"text-merge","x":118,"y":711,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_90","name":"qty67","type":"text-merge","x":118,"y":724,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_91","name":"line41","type":"text-merge","x":148,"y":368,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_92","name":"line42","type":"text-merge","x":148,"y":381,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_93","name":"line43","type":"text-merge","x":148,"y":395,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_94","name":"line44","type":"text-merge","x":148,"y":409,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_95","name":"line45","type":"text-merge","x":148,"y":422,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_96","name":"line46","type":"text-merge","x":148,"y":436,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_97","name":"line47","type":"text-merge","x":148,"y":450,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_98","name":"line48","type":"text-merge","x":148,"y":464,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_99","name":"line49","type":"text-merge","x":148,"y":477,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_100","name":"line50","type":"text-merge","x":148,"y":491,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_101","name":"line51","type":"text-merge","x":148,"y":505,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_102","name":"line52","type":"text-merge","x":148,"y":518,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_103","name":"line53","type":"text-merge","x":148,"y":532,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_104","name":"line54","type":"text-merge","x":148,"y":546,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_105","name":"line55","type":"text-merge","x":148,"y":559,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_106","name":"line56","type":"text-merge","x":148,"y":573,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_107","name":"line57","type":"text-merge","x":148,"y":587,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_108","name":"line58","type":"text-merge","x":148,"y":600,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_109","name":"line59","type":"text-merge","x":148,"y":614,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_110","name":"line60","type":"text-merge","x":148,"y":628,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_111","name":"line61","type":"text-merge","x":148,"y":642,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_112","name":"line62","type":"text-merge","x":148,"y":656,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_113","name":"line63","type":"text-merge","x":148,"y":668,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_114","name":"line64","type":"text-merge","x":148,"y":684,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_115","name":"line65","type":"text-merge","x":148,"y":696,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_116","name":"line66","type":"text-merge","x":148,"y":710,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_117","name":"line67","type":"text-merge","x":148,"y":723,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_118","name":"price41","type":"text-merge","x":484,"y":368,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_119","name":"price42","type":"text-merge","x":483,"y":381,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_120","name":"price43","type":"text-merge","x":484,"y":395,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_121","name":"price44","type":"text-merge","x":485,"y":409,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_122","name":"price45","type":"text-merge","x":483,"y":422,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_123","name":"price46","type":"text-merge","x":484,"y":436,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_124","name":"price47","type":"text-merge","x":484,"y":450,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_125","name":"price48","type":"text-merge","x":484,"y":464,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_126","name":"price49","type":"text-merge","x":484,"y":477,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_127","name":"price50","type":"text-merge","x":485,"y":491,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_128","name":"price51","type":"text-merge","x":483,"y":505,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_129","name":"price52","type":"text-merge","x":485,"y":518,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_130","name":"price53","type":"text-merge","x":483,"y":532,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_131","name":"price54","type":"text-merge","x":485,"y":546,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_132","name":"price55","type":"text-merge","x":484,"y":559,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_133","name":"price56","type":"text-merge","x":483,"y":573,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_134","name":"price57","type":"text-merge","x":484,"y":587,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_135","name":"price58","type":"text-merge","x":483,"y":600,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_136","name":"price59","type":"text-merge","x":485,"y":614,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_137","name":"price60","type":"text-merge","x":484,"y":628,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_138","name":"price61","type":"text-merge","x":485,"y":643,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_139","name":"price62","type":"text-merge","x":485,"y":655,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_140","name":"price63","type":"text-merge","x":483,"y":669,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_141","name":"price64","type":"text-merge","x":483,"y":683,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_142","name":"price65","type":"text-merge","x":484,"y":696,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_143","name":"price66","type":"text-merge","x":484,"y":710,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_144","name":"price67","type":"text-merge","x":485,"y":724,"width":100,"height":16,"required":false,"signer":"sender","page":1}
];

var buildingExtendedFieldsCCI = [
    {"api_id":"buicef10_1","name":"qty22","type":"text-merge","x":118,"y":81,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_2","name":"line22","type":"text-merge","x":148,"y":81,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_3","name":"price22","type":"text-merge","x":482,"y":81,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_4","name":"qty23","type":"text-merge","x":118,"y":94,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_5","name":"qty24","type":"text-merge","x":118,"y":108,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_6","name":"qty25","type":"text-merge","x":118,"y":122,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_7","name":"qty26","type":"text-merge","x":118,"y":135,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_8","name":"line23","type":"text-merge","x":148,"y":94,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_9","name":"line24","type":"text-merge","x":148,"y":108,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_10","name":"line25","type":"text-merge","x":148,"y":122,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_11","name":"line26","type":"text-merge","x":148,"y":135,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_12","name":"price23","type":"text-merge","x":482,"y":94,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_13","name":"price24","type":"text-merge","x":482,"y":108,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_14","name":"price25","type":"text-merge","x":482,"y":122,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_15","name":"price26","type":"text-merge","x":482,"y":135,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_16","name":"qty25","type":"text-merge","x":118,"y":149,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_17","name":"qty26","type":"text-merge","x":118,"y":163,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_18","name":"qty27","type":"text-merge","x":118,"y":176,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_19","name":"qty28","type":"text-merge","x":118,"y":190,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_20","name":"qty29","type":"text-merge","x":118,"y":204,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_21","name":"qty30","type":"text-merge","x":118,"y":217,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_22","name":"qty31","type":"text-merge","x":118,"y":231,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_23","name":"qty32","type":"text-merge","x":118,"y":245,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_24","name":"qty33","type":"text-merge","x":118,"y":258,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_25","name":"qty34","type":"text-merge","x":118,"y":272,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_26","name":"qty35","type":"text-merge","x":118,"y":286,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_27","name":"qty36","type":"text-merge","x":118,"y":299,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_28","name":"qty37","type":"text-merge","x":118,"y":313,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_29","name":"qty38","type":"text-merge","x":118,"y":327,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_30","name":"qty39","type":"text-merge","x":118,"y":340,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_31","name":"qty40","type":"text-merge","x":118,"y":354,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_32","name":"line25","type":"text-merge","x":148,"y":149,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_33","name":"line26","type":"text-merge","x":148,"y":163,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_34","name":"line27","type":"text-merge","x":148,"y":176,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_35","name":"line28","type":"text-merge","x":148,"y":190,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_36","name":"line29","type":"text-merge","x":148,"y":204,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_37","name":"line30","type":"text-merge","x":148,"y":217,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_38","name":"line31","type":"text-merge","x":148,"y":231,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_39","name":"line32","type":"text-merge","x":148,"y":245,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_40","name":"line33","type":"text-merge","x":148,"y":258,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_41","name":"line34","type":"text-merge","x":148,"y":272,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_42","name":"line35","type":"text-merge","x":148,"y":286,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_43","name":"line36","type":"text-merge","x":148,"y":299,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_44","name":"line37","type":"text-merge","x":148,"y":313,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_45","name":"line38","type":"text-merge","x":148,"y":327,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_46","name":"line39","type":"text-merge","x":148,"y":340,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_47","name":"line40","type":"text-merge","x":148,"y":354,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_48","name":"price25","type":"text-merge","x":482,"y":149,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_49","name":"price26","type":"text-merge","x":482,"y":163,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_50","name":"price27","type":"text-merge","x":482,"y":176,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_51","name":"price28","type":"text-merge","x":482,"y":190,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_52","name":"price29","type":"text-merge","x":482,"y":204,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_53","name":"price30","type":"text-merge","x":482,"y":217,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_54","name":"price31","type":"text-merge","x":482,"y":231,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_55","name":"price32","type":"text-merge","x":482,"y":245,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_56","name":"price33","type":"text-merge","x":482,"y":258,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_58","name":"price34","type":"text-merge","x":482,"y":272,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_59","name":"price35","type":"text-merge","x":482,"y":286,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_60","name":"price36","type":"text-merge","x":482,"y":299,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_61","name":"price37","type":"text-merge","x":482,"y":313,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_62","name":"price38","type":"text-merge","x":482,"y":327,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_63","name":"price39","type":"text-merge","x":482,"y":340,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_57","name":"price40","type":"text-merge","x":482,"y":354,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_64","name":"qty41","type":"text-merge","x":118,"y":368,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_65","name":"qty42","type":"text-merge","x":118,"y":381,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_66","name":"qty43","type":"text-merge","x":118,"y":395,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_67","name":"qty44","type":"text-merge","x":118,"y":409,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_68","name":"qty45","type":"text-merge","x":118,"y":422,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_69","name":"qty46","type":"text-merge","x":118,"y":436,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_70","name":"qty47","type":"text-merge","x":118,"y":450,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_71","name":"qty48","type":"text-merge","x":118,"y":464,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_72","name":"qty49","type":"text-merge","x":118,"y":477,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_73","name":"qty50","type":"text-merge","x":118,"y":491,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_74","name":"qty51","type":"text-merge","x":118,"y":505,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_75","name":"qty52","type":"text-merge","x":118,"y":518,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_76","name":"qty53","type":"text-merge","x":118,"y":532,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_77","name":"qty54","type":"text-merge","x":118,"y":546,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_78","name":"qty55","type":"text-merge","x":118,"y":559,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_79","name":"qty56","type":"text-merge","x":118,"y":573,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_80","name":"qty57","type":"text-merge","x":118,"y":587,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_81","name":"qty58","type":"text-merge","x":118,"y":600,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_82","name":"qty59","type":"text-merge","x":118,"y":614,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_83","name":"qty60","type":"text-merge","x":118,"y":628,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_84","name":"qty61","type":"text-merge","x":118,"y":642,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_85","name":"qty62","type":"text-merge","x":118,"y":656,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_86","name":"qty63","type":"text-merge","x":118,"y":670,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_87","name":"qty64","type":"text-merge","x":118,"y":683,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_88","name":"qty65","type":"text-merge","x":118,"y":697,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_89","name":"qty66","type":"text-merge","x":118,"y":711,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_90","name":"qty67","type":"text-merge","x":118,"y":724,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_91","name":"line41","type":"text-merge","x":148,"y":368,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_92","name":"line42","type":"text-merge","x":148,"y":381,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_93","name":"line43","type":"text-merge","x":148,"y":395,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_94","name":"line44","type":"text-merge","x":148,"y":409,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_95","name":"line45","type":"text-merge","x":148,"y":422,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_96","name":"line46","type":"text-merge","x":148,"y":436,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_97","name":"line47","type":"text-merge","x":148,"y":450,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_98","name":"line48","type":"text-merge","x":148,"y":464,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_99","name":"line49","type":"text-merge","x":148,"y":477,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_100","name":"line50","type":"text-merge","x":148,"y":491,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_101","name":"line51","type":"text-merge","x":148,"y":505,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_102","name":"line52","type":"text-merge","x":148,"y":518,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_103","name":"line53","type":"text-merge","x":148,"y":532,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_104","name":"line54","type":"text-merge","x":148,"y":546,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_105","name":"line55","type":"text-merge","x":148,"y":559,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_106","name":"line56","type":"text-merge","x":148,"y":573,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_107","name":"line57","type":"text-merge","x":148,"y":587,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_108","name":"line58","type":"text-merge","x":148,"y":600,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_109","name":"line59","type":"text-merge","x":148,"y":614,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_110","name":"line60","type":"text-merge","x":148,"y":628,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_111","name":"line61","type":"text-merge","x":148,"y":642,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_112","name":"line62","type":"text-merge","x":148,"y":656,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_113","name":"line63","type":"text-merge","x":148,"y":668,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_114","name":"line64","type":"text-merge","x":148,"y":684,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_115","name":"line65","type":"text-merge","x":148,"y":696,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_116","name":"line66","type":"text-merge","x":148,"y":710,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_117","name":"line67","type":"text-merge","x":148,"y":723,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_118","name":"price41","type":"text-merge","x":484,"y":368,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_119","name":"price42","type":"text-merge","x":483,"y":381,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_120","name":"price43","type":"text-merge","x":484,"y":395,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_121","name":"price44","type":"text-merge","x":485,"y":409,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_122","name":"price45","type":"text-merge","x":483,"y":422,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_123","name":"price46","type":"text-merge","x":484,"y":436,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_124","name":"price47","type":"text-merge","x":484,"y":450,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_125","name":"price48","type":"text-merge","x":484,"y":464,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_126","name":"price49","type":"text-merge","x":484,"y":477,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_127","name":"price50","type":"text-merge","x":485,"y":491,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_128","name":"price51","type":"text-merge","x":483,"y":505,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_129","name":"price52","type":"text-merge","x":485,"y":518,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_130","name":"price53","type":"text-merge","x":483,"y":532,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_131","name":"price54","type":"text-merge","x":485,"y":546,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_132","name":"price55","type":"text-merge","x":484,"y":559,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_133","name":"price56","type":"text-merge","x":483,"y":573,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_134","name":"price57","type":"text-merge","x":484,"y":587,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_135","name":"price58","type":"text-merge","x":483,"y":600,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_136","name":"price59","type":"text-merge","x":485,"y":614,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_137","name":"price60","type":"text-merge","x":484,"y":628,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_138","name":"price61","type":"text-merge","x":485,"y":643,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_139","name":"price62","type":"text-merge","x":485,"y":655,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_140","name":"price63","type":"text-merge","x":483,"y":669,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_141","name":"price64","type":"text-merge","x":483,"y":683,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_142","name":"price65","type":"text-merge","x":484,"y":696,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_143","name":"price66","type":"text-merge","x":484,"y":710,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_144","name":"price67","type":"text-merge","x":485,"y":724,"width":100,"height":16,"required":false,"signer":"sender","page":1}
];

var buildingExtendedFieldsINT = [
    {"api_id":"buicef10_1","name":"qty16","type":"text-merge","x":118,"y":81,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_2","name":"line16","type":"text-merge","x":148,"y":81,"width":658,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_3","name":"price16","type":"text-merge","x":482,"y":81,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_4","name":"qty17","type":"text-merge","x":118,"y":94,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_5","name":"qty18","type":"text-merge","x":118,"y":108,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_6","name":"qty19","type":"text-merge","x":118,"y":122,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_7","name":"qty20","type":"text-merge","x":118,"y":135,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_8","name":"line17","type":"text-merge","x":148,"y":94,"width":658,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_9","name":"line18","type":"text-merge","x":148,"y":108,"width":658,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_10","name":"line19","type":"text-merge","x":148,"y":122,"width":658,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_11","name":"line20","type":"text-merge","x":148,"y":135,"width":658,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_12","name":"price17","type":"text-merge","x":482,"y":94,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_13","name":"price18","type":"text-merge","x":482,"y":108,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_14","name":"price19","type":"text-merge","x":482,"y":122,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_15","name":"price20","type":"text-merge","x":482,"y":135,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_16","name":"qty21","type":"text-merge","x":118,"y":149,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_17","name":"qty26","type":"text-merge","x":118,"y":163,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_18","name":"qty27","type":"text-merge","x":118,"y":176,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_19","name":"qty28","type":"text-merge","x":118,"y":190,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_20","name":"qty29","type":"text-merge","x":118,"y":204,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_21","name":"qty30","type":"text-merge","x":118,"y":217,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_22","name":"qty31","type":"text-merge","x":118,"y":231,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_23","name":"qty32","type":"text-merge","x":118,"y":245,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_24","name":"qty33","type":"text-merge","x":118,"y":258,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_25","name":"qty34","type":"text-merge","x":118,"y":272,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_26","name":"qty35","type":"text-merge","x":118,"y":286,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_27","name":"qty36","type":"text-merge","x":118,"y":299,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_28","name":"qty37","type":"text-merge","x":118,"y":313,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_29","name":"qty38","type":"text-merge","x":118,"y":327,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_30","name":"qty39","type":"text-merge","x":118,"y":340,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_31","name":"qty40","type":"text-merge","x":118,"y":354,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_32","name":"line21","type":"text-merge","x":148,"y":149,"width":658,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_33","name":"line26","type":"text-merge","x":148,"y":163,"width":658,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_34","name":"line27","type":"text-merge","x":148,"y":176,"width":658,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_35","name":"line28","type":"text-merge","x":148,"y":190,"width":658,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_36","name":"line29","type":"text-merge","x":148,"y":204,"width":658,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_37","name":"line30","type":"text-merge","x":148,"y":217,"width":658,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_38","name":"line31","type":"text-merge","x":148,"y":231,"width":658,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_39","name":"line32","type":"text-merge","x":148,"y":245,"width":658,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_40","name":"line33","type":"text-merge","x":148,"y":258,"width":658,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_41","name":"line34","type":"text-merge","x":148,"y":272,"width":658,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_42","name":"line35","type":"text-merge","x":148,"y":286,"width":658,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_43","name":"line36","type":"text-merge","x":148,"y":299,"width":658,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_44","name":"line37","type":"text-merge","x":148,"y":313,"width":658,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_45","name":"line38","type":"text-merge","x":148,"y":327,"width":658,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_46","name":"line39","type":"text-merge","x":148,"y":340,"width":658,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_47","name":"line40","type":"text-merge","x":148,"y":354,"width":658,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_48","name":"price21","type":"text-merge","x":482,"y":149,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_49","name":"price26","type":"text-merge","x":482,"y":163,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_50","name":"price27","type":"text-merge","x":482,"y":176,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_51","name":"price28","type":"text-merge","x":482,"y":190,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_52","name":"price29","type":"text-merge","x":482,"y":204,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_53","name":"price30","type":"text-merge","x":482,"y":217,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_54","name":"price31","type":"text-merge","x":482,"y":231,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_55","name":"price32","type":"text-merge","x":482,"y":245,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_56","name":"price33","type":"text-merge","x":482,"y":258,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_58","name":"price34","type":"text-merge","x":482,"y":272,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_59","name":"price35","type":"text-merge","x":482,"y":286,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_60","name":"price36","type":"text-merge","x":482,"y":299,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_61","name":"price37","type":"text-merge","x":482,"y":313,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_62","name":"price38","type":"text-merge","x":482,"y":327,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_63","name":"price39","type":"text-merge","x":482,"y":340,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_57","name":"price40","type":"text-merge","x":482,"y":354,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_64","name":"qty41","type":"text-merge","x":118,"y":368,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_65","name":"qty42","type":"text-merge","x":118,"y":381,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_66","name":"qty43","type":"text-merge","x":118,"y":395,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_67","name":"qty44","type":"text-merge","x":118,"y":409,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_68","name":"qty45","type":"text-merge","x":118,"y":422,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_69","name":"qty46","type":"text-merge","x":118,"y":436,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_70","name":"qty47","type":"text-merge","x":118,"y":450,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_71","name":"qty48","type":"text-merge","x":118,"y":464,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_72","name":"qty49","type":"text-merge","x":118,"y":477,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_73","name":"qty50","type":"text-merge","x":118,"y":491,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_74","name":"qty51","type":"text-merge","x":118,"y":505,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_75","name":"qty52","type":"text-merge","x":118,"y":518,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_76","name":"qty53","type":"text-merge","x":118,"y":532,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_77","name":"qty54","type":"text-merge","x":118,"y":546,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_78","name":"qty55","type":"text-merge","x":118,"y":559,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_79","name":"qty56","type":"text-merge","x":118,"y":573,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_80","name":"qty57","type":"text-merge","x":118,"y":587,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_81","name":"qty58","type":"text-merge","x":118,"y":600,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_82","name":"qty59","type":"text-merge","x":118,"y":614,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_83","name":"qty60","type":"text-merge","x":118,"y":628,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_84","name":"qty61","type":"text-merge","x":118,"y":642,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_85","name":"qty62","type":"text-merge","x":118,"y":656,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_86","name":"qty63","type":"text-merge","x":118,"y":670,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_87","name":"qty64","type":"text-merge","x":118,"y":683,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_88","name":"qty65","type":"text-merge","x":118,"y":697,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_89","name":"qty66","type":"text-merge","x":118,"y":711,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_90","name":"qty67","type":"text-merge","x":118,"y":724,"width":52,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_91","name":"line41","type":"text-merge","x":148,"y":368,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_92","name":"line42","type":"text-merge","x":148,"y":381,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_93","name":"line43","type":"text-merge","x":148,"y":395,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_94","name":"line44","type":"text-merge","x":148,"y":409,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_95","name":"line45","type":"text-merge","x":148,"y":422,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_96","name":"line46","type":"text-merge","x":148,"y":436,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_97","name":"line47","type":"text-merge","x":148,"y":450,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_98","name":"line48","type":"text-merge","x":148,"y":464,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_99","name":"line49","type":"text-merge","x":148,"y":477,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_100","name":"line50","type":"text-merge","x":148,"y":491,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_101","name":"line51","type":"text-merge","x":148,"y":505,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_102","name":"line52","type":"text-merge","x":148,"y":518,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_103","name":"line53","type":"text-merge","x":148,"y":532,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_104","name":"line54","type":"text-merge","x":148,"y":546,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_105","name":"line55","type":"text-merge","x":148,"y":559,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_106","name":"line56","type":"text-merge","x":148,"y":573,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_107","name":"line57","type":"text-merge","x":148,"y":587,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_108","name":"line58","type":"text-merge","x":148,"y":600,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_109","name":"line59","type":"text-merge","x":148,"y":614,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_110","name":"line60","type":"text-merge","x":148,"y":628,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_111","name":"line61","type":"text-merge","x":148,"y":642,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_112","name":"line62","type":"text-merge","x":148,"y":656,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_113","name":"line63","type":"text-merge","x":148,"y":668,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_114","name":"line64","type":"text-merge","x":148,"y":684,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_115","name":"line65","type":"text-merge","x":148,"y":696,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_116","name":"line66","type":"text-merge","x":148,"y":710,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_117","name":"line67","type":"text-merge","x":148,"y":723,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_118","name":"price41","type":"text-merge","x":484,"y":368,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_119","name":"price42","type":"text-merge","x":483,"y":381,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_120","name":"price43","type":"text-merge","x":484,"y":395,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_121","name":"price44","type":"text-merge","x":485,"y":409,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_122","name":"price45","type":"text-merge","x":483,"y":422,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_123","name":"price46","type":"text-merge","x":484,"y":436,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_124","name":"price47","type":"text-merge","x":484,"y":450,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_125","name":"price48","type":"text-merge","x":484,"y":464,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_126","name":"price49","type":"text-merge","x":484,"y":477,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_127","name":"price50","type":"text-merge","x":485,"y":491,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_128","name":"price51","type":"text-merge","x":483,"y":505,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_129","name":"price52","type":"text-merge","x":485,"y":518,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_130","name":"price53","type":"text-merge","x":483,"y":532,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_131","name":"price54","type":"text-merge","x":485,"y":546,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_132","name":"price55","type":"text-merge","x":484,"y":559,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_133","name":"price56","type":"text-merge","x":483,"y":573,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_134","name":"price57","type":"text-merge","x":484,"y":587,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_135","name":"price58","type":"text-merge","x":483,"y":600,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_136","name":"price59","type":"text-merge","x":485,"y":614,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_137","name":"price60","type":"text-merge","x":484,"y":628,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_138","name":"price61","type":"text-merge","x":485,"y":643,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_139","name":"price62","type":"text-merge","x":485,"y":655,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_140","name":"price63","type":"text-merge","x":483,"y":669,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_141","name":"price64","type":"text-merge","x":483,"y":683,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_142","name":"price65","type":"text-merge","x":484,"y":696,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_143","name":"price66","type":"text-merge","x":484,"y":710,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_144","name":"price67","type":"text-merge","x":485,"y":724,"width":100,"height":16,"required":false,"signer":"sender","page":1}
];

/** The fields here are setup as "merge fields" witch will pull their data from the "custom_fields" in options.
/ * Any merge fields here will need entries in the custom_fields. Each merge field must have it's own unique field
/ * in custom_filels!
*/
var fields = {
    PSG: [

        // contract
        [ 
            {"api_id":"ef1cef10_1","name":"date","type":"text-merge","x":76,"y":56,"width":200,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_2","name":"customer","type":"text-merge","x":75,"y":103,"width":250,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_3","name":"street","type":"text-merge","x":280,"y":103,"width":300,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_4","name":"city","type":"text-merge","x":54,"y":120,"width":300,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_5","name":"state","type":"text-merge","x":245,"y":120,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_6","name":"zip","type":"text-merge","x":330,"y":120,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_7","name":"county","type":"text-merge","x":420,"y":120,"width":200,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_8","name":"rate","type":"text-merge","x":558,"y":120,"width":62,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_9","name":"phone2","type":"text-merge","x":58,"y":135,"width":280,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_10","name":"email","type":"text-merge","x":417,"y":135,"width":315,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_11","name":"building","type":"checkbox-merge","x":21,"y":180,"width":200,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_12","name":"width","type":"text-merge","x":120,"y":164,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_13","name":"length","type":"text-merge","x":207,"y":164,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_14","name":"height","type":"text-merge","x":287,"y":164,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_15","name":"gauge","type":"text-merge","x":377,"y":164,"width":82,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_16","name":"basePrice","type":"text-merge","x":440,"y":185,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_17","name":"price","type":"text-merge","x":518,"y":280,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_18","name":"tax","type":"text-merge","x":518,"y":314,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_19","name":"subtotal","type":"text-merge","x":518,"y":345,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_20","name":"downpayment","type":"text-merge","x":518,"y":378,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_21","name":"balance","type":"text-merge","x":518,"y":414,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_22","name":"roofReg","type":"checkbox-merge","x":154,"y":472,"width":200,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_23","name":"roofVert","type":"checkbox-merge","x":206,"y":472,"width":200,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_24","name":"roofAframe","type":"checkbox-merge","x":252,"y":472,"width":200,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_25","name":"installGround","type":"checkbox-merge","x":241,"y":494,"width":200,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_26","name":"installAsphalt","type":"checkbox-merge","x":291,"y":494,"width":200,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_27","name":"installConcrete","type":"checkbox-merge","x":341,"y":494,"width":200,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_28","name":"installOther","type":"checkbox-merge","x":483,"y":494,"width":200,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_29","name":"uncertified","type":"checkbox-merge","x":279,"y":516,"width":200,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_30","name":"certified","type":"checkbox-merge","x":365,"y":516,"width":200,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_31","name":"customer","type":"text-merge","x":48,"y":662,"width":220,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_32","name":"rep","type":"text-merge","x":179,"y":662,"width":220,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_33","name":"Customer","type":"signature","x":48,"y":688,"width":220,"height":16,"required":true,"signer":0,"page":1},{"api_id":"ef1cef10_34","name":"dateSigned","type":"date_signed","x":179,"y":688,"width":220,"height":16,"required":true,"signer":0,"page":1},{"api_id":"ef1cef10_35","name":"qty1","type":"text-merge","x":158,"y":226,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_36","name":"line1","type":"text-merge","x":183,"y":226,"width":462,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_37","name":"price1","type":"text-merge","x":440,"y":226,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_38","name":"qty2","type":"text-merge","x":158,"y":237,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_39","name":"line2","type":"text-merge","x":183,"y":237,"width":462,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_40","name":"price2","type":"text-merge","x":440,"y":237,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_41","name":"qty3","type":"text-merge","x":158,"y":249,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_42","name":"line3","type":"text-merge","x":183,"y":249,"width":462,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_43","name":"qty4","type":"text-merge","x":158,"y":261,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_44","name":"line4","type":"text-merge","x":183,"y":261,"width":462,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_45","name":"price3","type":"text-merge","x":440,"y":249,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_46","name":"price4","type":"text-merge","x":440,"y":261,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_47","name":"qty5","type":"text-merge","x":158,"y":272,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_48","name":"qty6","type":"text-merge","x":158,"y":284,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_49","name":"qty7","type":"text-merge","x":158,"y":296,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_50","name":"qty8","type":"text-merge","x":158,"y":308,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_51","name":"qty9","type":"text-merge","x":158,"y":319,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_52","name":"qty10","type":"text-merge","x":158,"y":331,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_53","name":"line5","type":"text-merge","x":183,"y":272,"width":462,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_54","name":"line6","type":"text-merge","x":183,"y":284,"width":462,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_55","name":"line7","type":"text-merge","x":183,"y":296,"width":462,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_56","name":"line8","type":"text-merge","x":183,"y":308,"width":462,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_57","name":"line9","type":"text-merge","x":183,"y":319,"width":462,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_58","name":"line10","type":"text-merge","x":183,"y":331,"width":462,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_59","name":"price5","type":"text-merge","x":440,"y":272,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_60","name":"price6","type":"text-merge","x":440,"y":284,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_61","name":"price7","type":"text-merge","x":440,"y":296,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_62","name":"price8","type":"text-merge","x":440,"y":308,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_63","name":"price9","type":"text-merge","x":440,"y":319,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_64","name":"price10","type":"text-merge","x":440,"y":331,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_65","name":"qty11","type":"text-merge","x":158,"y":342,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_66","name":"qty12","type":"text-merge","x":158,"y":354,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_67","name":"qty13","type":"text-merge","x":158,"y":365,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_68","name":"qty14","type":"text-merge","x":158,"y":377,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_69","name":"qty15","type":"text-merge","x":158,"y":389,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_70","name":"qty16","type":"text-merge","x":158,"y":401,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_71","name":"qty17","type":"text-merge","x":158,"y":412,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_72","name":"qty18","type":"text-merge","x":158,"y":424,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_73","name":"qty19","type":"text-merge","x":158,"y":435,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_74","name":"line11","type":"text-merge","x":183,"y":342,"width":462,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_75","name":"line12","type":"text-merge","x":183,"y":354,"width":462,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_76","name":"line13","type":"text-merge","x":183,"y":365,"width":462,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_77","name":"line14","type":"text-merge","x":183,"y":377,"width":462,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_78","name":"line15","type":"text-merge","x":183,"y":389,"width":462,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_79","name":"line16","type":"text-merge","x":183,"y":401,"width":462,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_80","name":"line17","type":"text-merge","x":183,"y":412,"width":462,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_81","name":"line18","type":"text-merge","x":183,"y":424,"width":462,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_82","name":"line19","type":"text-merge","x":183,"y":435,"width":462,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_83","name":"price11","type":"text-merge","x":440,"y":342,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_84","name":"price12","type":"text-merge","x":440,"y":354,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_85","name":"price13","type":"text-merge","x":440,"y":365,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_86","name":"price14","type":"text-merge","x":440,"y":377,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_87","name":"price15","type":"text-merge","x":440,"y":389,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_88","name":"price16","type":"text-merge","x":440,"y":401,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_89","name":"price17","type":"text-merge","x":440,"y":412,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_90","name":"price18","type":"text-merge","x":440,"y":424,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_91","name":"price19","type":"text-merge","x":440,"y":435,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_92","name":"powerYes","type":"checkbox-merge","x":134,"y":516,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_93","name":"powerNo","type":"checkbox-merge","x":158,"y":516,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_94","name":"sideWallOrientHorz","type":"checkbox-merge","x":347,"y":472,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_95","name":"sideWallOrientVert","type":"checkbox-merge","x":395,"y":472,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_96","name":"top","type":"text-merge","x":115,"y":199,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_97","name":"sides","type":"text-merge","x":280,"y":199,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_98","name":"trim","type":"text-merge","x":197,"y":199,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_99","name":"ends","type":"text-merge","x":363,"y":199,"width":100,"height":16,"required":false,"signer":"sender","page":1},
        ],
        
        // Generic Door Location Form
        [
           
        ],

        // Generic Roof Waiver
        [
            {"api_id":"ef1cef12_1","name":"customer2","type":"text-merge","x":90,"y":540,"width":220,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef12_2","name":"dateSigned","type":"date_signed","x":90,"y":586,"width":220,"height":16,"required":true,"signer":"0","page":1},{"api_id":"ef1cef12_03","name":"Customer","type":"signature","x":90,"y":640,"width":220,"height":16,"required":true,"signer":0,"page":1},
        ],

    ],
    
    Elephant: [
        
        // contract
        [
            {"api_id":"ef1cef10_1","name":"date","type":"text-merge","x":76,"y":80,"width":200,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_2","name":"customer","type":"text-merge","x":74,"y":128,"width":250,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_3","name":"street","type":"text-merge","x":280,"y":128,"width":300,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_4","name":"city","type":"text-merge","x":55,"y":144,"width":300,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_5","name":"state","type":"text-merge","x":245,"y":144,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_6","name":"zip","type":"text-merge","x":329,"y":144,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_7","name":"county","type":"text-merge","x":423,"y":144,"width":200,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_8","name":"rate","type":"text-merge","x":558,"y":144,"width":62,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_9","name":"phone2","type":"text-merge","x":61,"y":160,"width":280,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_10","name":"email","type":"text-merge","x":416,"y":160,"width":315,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_11","name":"building","type":"checkbox-merge","x":21,"y":187,"width":200,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_12","name":"width","type":"text-merge","x":120,"y":189,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_13","name":"length","type":"text-merge","x":207,"y":189,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_14","name":"height","type":"text-merge","x":287,"y":189,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_15","name":"gauge","type":"text-merge","x":376,"y":189,"width":82,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_16","name":"basePrice","type":"text-merge","x":438,"y":209,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_17","name":"price","type":"text-merge","x":523,"y":302,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_18","name":"tax","type":"text-merge","x":523,"y":337,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_19","name":"subtotal","type":"text-merge","x":523,"y":363,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_20","name":"downpayment","type":"text-merge","x":523,"y":380,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_21","name":"balance","type":"text-merge","x":517,"y":439,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_22","name":"roofReg","type":"checkbox-merge","x":154,"y":495,"width":200,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_23","name":"roofVert","type":"checkbox-merge","x":206,"y":495,"width":200,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_24","name":"roofAframe","type":"checkbox-merge","x":252,"y":495,"width":200,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_25","name":"installGround","type":"checkbox-merge","x":241,"y":513,"width":200,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_26","name":"installAsphalt","type":"checkbox-merge","x":291,"y":513,"width":200,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_27","name":"installConcrete","type":"checkbox-merge","x":341,"y":513,"width":200,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_28","name":"installOther","type":"checkbox-merge","x":483,"y":513,"width":200,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_29","name":"uncertified","type":"checkbox-merge","x":279,"y":531,"width":200,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_30","name":"certified","type":"checkbox-merge","x":365,"y":531,"width":200,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_31","name":"customer","type":"text-merge","x":318,"y":698,"width":220,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_32","name":"rep","type":"text-merge","x":449,"y":698,"width":220,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_33","name":"Customer","type":"signature","x":318,"y":726,"width":220,"height":16,"required":true,"signer":0,"page":1},{"api_id":"ef1cef10_34","name":"dateSigned","type":"date_signed","x":449,"y":726,"width":220,"height":16,"required":true,"signer":0,"page":1},{"api_id":"ef1cef10_35","name":"qty1","type":"text-merge","x":158,"y":250,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_36","name":"line1","type":"text-merge","x":187,"y":250,"width":462,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_37","name":"price1","type":"text-merge","x":440,"y":250,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_38","name":"qty2","type":"text-merge","x":158,"y":261,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_39","name":"line2","type":"text-merge","x":187,"y":261,"width":462,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_40","name":"price2","type":"text-merge","x":440,"y":261,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_41","name":"qty3","type":"text-merge","x":158,"y":273,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_42","name":"line3","type":"text-merge","x":187,"y":273,"width":462,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_43","name":"qty4","type":"text-merge","x":158,"y":285,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_44","name":"line4","type":"text-merge","x":187,"y":285,"width":462,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_45","name":"price3","type":"text-merge","x":440,"y":273,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_46","name":"price4","type":"text-merge","x":440,"y":285,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_47","name":"qty5","type":"text-merge","x":158,"y":297,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_48","name":"qty6","type":"text-merge","x":158,"y":308,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_49","name":"qty7","type":"text-merge","x":158,"y":320,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_50","name":"qty8","type":"text-merge","x":158,"y":332,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_51","name":"qty9","type":"text-merge","x":158,"y":343,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_52","name":"qty10","type":"text-merge","x":158,"y":355,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_53","name":"line5","type":"text-merge","x":187,"y":297,"width":462,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_54","name":"line6","type":"text-merge","x":187,"y":308,"width":462,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_55","name":"line7","type":"text-merge","x":187,"y":320,"width":462,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_56","name":"line8","type":"text-merge","x":187,"y":332,"width":462,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_57","name":"line9","type":"text-merge","x":187,"y":343,"width":462,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_58","name":"line10","type":"text-merge","x":187,"y":355,"width":462,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_59","name":"price5","type":"text-merge","x":440,"y":297,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_60","name":"price6","type":"text-merge","x":440,"y":308,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_61","name":"price7","type":"text-merge","x":440,"y":320,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_62","name":"price8","type":"text-merge","x":440,"y":332,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_63","name":"price9","type":"text-merge","x":440,"y":343,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_64","name":"price10","type":"text-merge","x":440,"y":355,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_65","name":"qty11","type":"text-merge","x":158,"y":366,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_66","name":"qty12","type":"text-merge","x":158,"y":378,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_67","name":"qty13","type":"text-merge","x":158,"y":389,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_68","name":"qty14","type":"text-merge","x":158,"y":401,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_69","name":"qty15","type":"text-merge","x":158,"y":412,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_70","name":"qty16","type":"text-merge","x":158,"y":423,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_71","name":"qty17","type":"text-merge","x":158,"y":435,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_72","name":"qty18","type":"text-merge","x":158,"y":448,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_73","name":"qty19","type":"text-merge","x":158,"y":460,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_74","name":"line11","type":"text-merge","x":187,"y":366,"width":462,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_75","name":"line12","type":"text-merge","x":187,"y":378,"width":462,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_76","name":"line13","type":"text-merge","x":187,"y":389,"width":462,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_77","name":"line14","type":"text-merge","x":187,"y":401,"width":462,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_78","name":"line15","type":"text-merge","x":187,"y":412,"width":462,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_79","name":"line16","type":"text-merge","x":187,"y":423,"width":462,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_80","name":"line17","type":"text-merge","x":187,"y":435,"width":462,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_81","name":"line18","type":"text-merge","x":187,"y":448,"width":462,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_82","name":"line19","type":"text-merge","x":187,"y":460,"width":462,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_83","name":"price11","type":"text-merge","x":440,"y":366,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_84","name":"price12","type":"text-merge","x":440,"y":378,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_85","name":"price13","type":"text-merge","x":440,"y":389,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_86","name":"price14","type":"text-merge","x":440,"y":401,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_87","name":"price15","type":"text-merge","x":440,"y":412,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_88","name":"price16","type":"text-merge","x":440,"y":423,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_89","name":"price17","type":"text-merge","x":440,"y":435,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_90","name":"price18","type":"text-merge","x":440,"y":448,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_91","name":"price19","type":"text-merge","x":440,"y":460,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_92","name":"powerYes","type":"checkbox-merge","x":134,"y":531,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_93","name":"powerNo","type":"checkbox-merge","x":159,"y":531,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_94","name":"top","type":"text-merge","x":117,"y":224,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_95","name":"trim","type":"text-merge","x":197,"y":224,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_96","name":"sides","type":"text-merge","x":283,"y":224,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_97","name":"ends","type":"text-merge","x":364,"y":224,"width":100,"height":16,"required":false,"signer":"sender","page":1}
        ],

        // Generic Door Location Form
        [
            {"api_id":"ef1cef11_3","name":"width2","type":"text-merge","x":78,"y":97,"width":250,"height":16,"required":false,"signer":"sender","page":1},
            {"api_id":"ef1cef11_4","name":"length2","type":"text-merge","x":78,"y":114,"width":250,"height":16,"required":false,"signer":"sender","page":1},
            {"api_id":"ef1cef11_5","name":"height2","type":"text-merge","x":100,"y":129,"width":250,"height":16,"required":false,"signer":"sender","page":1},
            {"api_id":"ef1cef11_2","name":"customer2","type":"text-merge","x":570,"y":146,"width":250,"height":16,"required":false,"signer":"sender","page":1},
        ],

        // Generic Roof Waiver
        [
            {"api_id":"ef1cef12_1","name":"customer2","type":"text-merge","x":90,"y":540,"width":220,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef12_2","name":"dateSigned","type":"date_signed","x":90,"y":586,"width":220,"height":16,"required":true,"signer":"0","page":1},{"api_id":"ef1cef12_03","name":"Customer","type":"signature","x":90,"y":640,"width":220,"height":16,"required":true,"signer":0,"page":1},
        ],

    ],
    
    Eagle: [
        
        // contract
        [
            {"api_id":"ef1cef10_1","name":"customer","type":"text-merge","x":263,"y":148,"width":618,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_2","name":"date","type":"text-merge","x":80,"y":190,"width":280,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_3","name":"street","type":"text-merge","x":297,"y":162,"width":550,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_4","name":"city","type":"text-merge","x":258,"y":176,"width":220,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_5","name":"state","type":"text-merge","x":397,"y":176,"width":80,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_6","name":"zip","type":"text-merge","x":480,"y":176,"width":180,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_7","name":"email","type":"text-merge","x":262,"y":190,"width":280,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_8","name":"county","type":"text-merge","x":442,"y":190,"width":262,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_9","name":"phone2","type":"text-merge","x":447,"y":204,"width":252,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_10","name":"width","type":"text-merge","x":177,"y":264,"width":62,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_11","name":"length","type":"text-merge","x":223,"y":264,"width":62,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_12","name":"height","type":"text-merge","x":268,"y":264,"width":62,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_13","name":"top","type":"text-merge","x":360,"y":240,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_14","name":"sides","type":"text-merge","x":360,"y":257,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_15","name":"trim","type":"text-merge","x":360,"y":274,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_16","name":"price","type":"text-merge","x":506,"y":363,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_17","name":"tax","type":"text-merge","x":506,"y":391,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_18","name":"rate","type":"text-merge","x":444,"y":391,"width":60,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_19","name":"subtotal","type":"text-merge","x":506,"y":416,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_20","name":"downpayment","type":"text-merge","x":506,"y":448,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_21","name":"balance","type":"text-merge","x":506,"y":555,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_22","name":"gauge14","type":"checkbox-merge","x":94,"y":274,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_23","name":"gauge12","type":"checkbox-merge","x":129,"y":274,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_24","name":"qty1","type":"text-merge","x":53,"y":357,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_25","name":"line1","type":"text-merge","x":86,"y":357,"width":518,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_26","name":"price1","type":"text-merge","x":356,"y":357,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_27","name":"qty2","type":"text-merge","x":53,"y":371,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_28","name":"line2","type":"text-merge","x":86,"y":371,"width":518,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_29","name":"price2","type":"text-merge","x":356,"y":371,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_30","name":"qty3","type":"text-merge","x":53,"y":385,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_31","name":"line3","type":"text-merge","x":86,"y":385,"width":518,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_32","name":"price3","type":"text-merge","x":356,"y":385,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_33","name":"Customer","type":"signature","x":94,"y":708,"width":350,"height":16,"required":true,"signer":"0","page":1},{"api_id":"ef1cef10_34","name":"dateSigned","type":"date_signed","x":296,"y":708,"width":220,"height":16,"required":true,"signer":"0","page":1},{"api_id":"ef1cef10_35","name":"qty4","type":"text-merge","x":53,"y":399,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_36","name":"line4","type":"text-merge","x":86,"y":399,"width":518,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_37","name":"price4","type":"text-merge","x":356,"y":399,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_38","name":"qty5","type":"text-merge","x":53,"y":413,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_39","name":"qty6","type":"text-merge","x":53,"y":427,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_40","name":"qty7","type":"text-merge","x":53,"y":441,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_41","name":"qty8","type":"text-merge","x":53,"y":455,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_42","name":"qty9","type":"text-merge","x":53,"y":469,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_43","name":"qty10","type":"text-merge","x":53,"y":483,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_44","name":"line5","type":"text-merge","x":86,"y":413,"width":518,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_45","name":"line6","type":"text-merge","x":86,"y":427,"width":518,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_46","name":"line7","type":"text-merge","x":86,"y":441,"width":518,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_47","name":"line8","type":"text-merge","x":86,"y":455,"width":518,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_48","name":"line9","type":"text-merge","x":86,"y":469,"width":518,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_49","name":"line10","type":"text-merge","x":86,"y":483,"width":518,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_50","name":"price5","type":"text-merge","x":356,"y":413,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_51","name":"price6","type":"text-merge","x":356,"y":427,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_52","name":"price7","type":"text-merge","x":356,"y":441,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_53","name":"price8","type":"text-merge","x":356,"y":455,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_54","name":"price9","type":"text-merge","x":356,"y":469,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_55","name":"price10","type":"text-merge","x":356,"y":483,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_56","name":"qty11","type":"text-merge","x":53,"y":497,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_57","name":"qty12","type":"text-merge","x":53,"y":511,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_58","name":"qty13","type":"text-merge","x":53,"y":525,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_59","name":"qty14","type":"text-merge","x":53,"y":539,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_60","name":"qty15","type":"text-merge","x":53,"y":553,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_61","name":"qty16","type":"text-merge","x":53,"y":567,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_62","name":"qty17","type":"text-merge","x":53,"y":581,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_63","name":"qty18","type":"text-merge","x":53,"y":594,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_64","name":"qty19","type":"text-merge","x":53,"y":608,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_65","name":"line11","type":"text-merge","x":86,"y":497,"width":518,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_66","name":"line12","type":"text-merge","x":86,"y":511,"width":518,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_67","name":"line13","type":"text-merge","x":86,"y":525,"width":518,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_68","name":"line14","type":"text-merge","x":86,"y":539,"width":518,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_69","name":"line15","type":"text-merge","x":86,"y":553,"width":518,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_70","name":"line16","type":"text-merge","x":86,"y":567,"width":518,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_71","name":"line17","type":"text-merge","x":86,"y":581,"width":518,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_72","name":"line18","type":"text-merge","x":86,"y":594,"width":518,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_73","name":"line19","type":"text-merge","x":86,"y":608,"width":518,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_74","name":"price11","type":"text-merge","x":356,"y":497,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_75","name":"price12","type":"text-merge","x":356,"y":511,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_76","name":"price13","type":"text-merge","x":356,"y":525,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_77","name":"price14","type":"text-merge","x":356,"y":539,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_78","name":"price15","type":"text-merge","x":356,"y":553,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_79","name":"price16","type":"text-merge","x":356,"y":567,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_80","name":"price17","type":"text-merge","x":356,"y":581,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_81","name":"price18","type":"text-merge","x":356,"y":594,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_82","name":"price19","type":"text-merge","x":356,"y":608,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_83","name":"powerYes","type":"checkbox-merge","x":503,"y":325,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_84","name":"powerNo","type":"checkbox-merge","x":539,"y":325,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_85","name":"groundLevelYes","type":"checkbox-merge","x":503,"y":308,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_86","name":"groundLevelNo","type":"checkbox-merge","x":539,"y":308,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_87","name":"roofStyle","type":"text-merge","x":94,"y":240,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_88","name":"installSurface","type":"text-merge","x":497,"y":240,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_89","name":"building","type":"text-merge","x":94,"y":256,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_90","name":"buildOverYes","type":"checkbox-merge","x":373,"y":308,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_91","name":"buildOverNo","type":"checkbox-merge","x":405,"y":308,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_92","name":"dealerID","type":"text-merge","x":72,"y":147,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_93","name":"dealerName","type":"text-merge","x":87,"y":161,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_94","name":"dealerPhone","type":"text-merge","x":95,"y":176,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_95","name":"buildID","type":"text-merge","x":313,"y":3,"width":575,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_96","name":"buildID2","type":"text-merge","x":313,"y":770,"width":575,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_97","name":"cardRate","type":"text-merge","x":444,"y":589,"width":80,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_98","name":"dpRate","type":"text-merge","x":444,"y":448,"width":80,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_99","name":"cardBalanceDue","type":"text-merge","x":506,"y":589,"width":106,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_100","name":"certified","type":"text-merge","x":497,"y":274,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_101","name":"Customer","type":"signature","x":408,"y":744,"width":200,"height":16,"required":true,"signer":"0","page":2},{"api_id":"ef1cef10_102","name":"dateSigned","type":"date_signed","x":530,"y":744,"width":100,"height":16,"required":true,"signer":"0","page":2}
        ],

        // fields Eagle door location form
        [
            
        ],

        // Generic Roof Waiver
        [
            {"api_id":"ef1cef12_1","name":"customer2","type":"text-merge","x":90,"y":530,"width":220,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef12_2","name":"dateSigned","type":"date_signed","x":90,"y":586,"width":220,"height":16,"required":true,"signer":"0","page":1},{"api_id":"ef1cef12_03","name":"Customer","type":"signature","x":90,"y":640,"width":220,"height":16,"required":true,"signer":0,"page":1},
        ],

    ],

    EagleFL: [
        
        // contract
        [
            {"api_id":"ef1cef10_1","name":"customer","type":"text-merge","x":266,"y":143,"width":618,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_2","name":"date","type":"text-merge","x":84,"y":185,"width":280,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_3","name":"street","type":"text-merge","x":300,"y":156,"width":550,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_4","name":"city","type":"text-merge","x":262,"y":171,"width":220,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_5","name":"state","type":"text-merge","x":401,"y":171,"width":80,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_6","name":"zip","type":"text-merge","x":486,"y":171,"width":180,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_7","name":"email","type":"text-merge","x":265,"y":185,"width":280,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_8","name":"county","type":"text-merge","x":444,"y":185,"width":262,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_9","name":"phone2","type":"text-merge","x":449,"y":199,"width":252,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_10","name":"width","type":"text-merge","x":181,"y":259,"width":62,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_11","name":"length","type":"text-merge","x":226,"y":259,"width":62,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_12","name":"height","type":"text-merge","x":272,"y":259,"width":62,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_13","name":"top","type":"text-merge","x":360,"y":233,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_14","name":"sides","type":"text-merge","x":360,"y":250,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_15","name":"trim","type":"text-merge","x":360,"y":268,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_16","name":"subtotal","type":"text-merge","x":506,"y":358,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_17","name":"tax","type":"text-merge","x":506,"y":383,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_18","name":"rate","type":"text-merge","x":453,"y":389,"width":60,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_19","name":"price","type":"text-merge","x":506,"y":409,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_20","name":"downpayment","type":"text-merge","x":506,"y":435,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_21","name":"balance","type":"text-merge","x":506,"y":548,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_22","name":"gaug14","type":"checkbox-merge","x":98,"y":268,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_23","name":"gauge12","type":"checkbox-merge","x":133,"y":268,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_24","name":"qty1","type":"text-merge","x":53,"y":351,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_25","name":"line1","type":"text-merge","x":91,"y":351,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_26","name":"price1","type":"text-merge","x":356,"y":351,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_27","name":"qty2","type":"text-merge","x":53,"y":365,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_28","name":"line2","type":"text-merge","x":91,"y":365,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_29","name":"price2","type":"text-merge","x":356,"y":365,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_30","name":"qty3","type":"text-merge","x":53,"y":379,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_31","name":"line3","type":"text-merge","x":91,"y":379,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_32","name":"price3","type":"text-merge","x":356,"y":379,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_33","name":"Customer","type":"signature","x":98,"y":702,"width":350,"height":16,"required":true,"signer":"0","page":1},{"api_id":"ef1cef10_34","name":"dateSigned","type":"date_signed","x":299,"y":702,"width":220,"height":16,"required":true,"signer":"0","page":1},{"api_id":"ef1cef10_35","name":"qty4","type":"text-merge","x":53,"y":393,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_36","name":"line4","type":"text-merge","x":91,"y":393,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_37","name":"price4","type":"text-merge","x":356,"y":393,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_38","name":"qty5","type":"text-merge","x":53,"y":407,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_39","name":"qty6","type":"text-merge","x":53,"y":421,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_40","name":"qty7","type":"text-merge","x":53,"y":435,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_41","name":"qty8","type":"text-merge","x":53,"y":449,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_42","name":"qty9","type":"text-merge","x":53,"y":463,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_43","name":"qty10","type":"text-merge","x":53,"y":477,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_44","name":"line5","type":"text-merge","x":91,"y":407,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_45","name":"price5","type":"text-merge","x":355,"y":407,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_46","name":"line6","type":"text-merge","x":91,"y":421,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_47","name":"price6","type":"text-merge","x":356,"y":421,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_48","name":"line7","type":"text-merge","x":91,"y":435,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_49","name":"price7","type":"text-merge","x":356,"y":435,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_50","name":"line8","type":"text-merge","x":91,"y":449,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_51","name":"prive8","type":"text-merge","x":355,"y":449,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_52","name":"line9","type":"text-merge","x":91,"y":463,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_53","name":"price9","type":"text-merge","x":355,"y":463,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_54","name":"line10","type":"text-merge","x":91,"y":477,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_55","name":"price10","type":"text-merge","x":354,"y":477,"width":100,"height":16,"required":false,"signer":"sender","page":1}
        ]

    ],

    CarolinaCarports: [
        
        // contract
        [
            {"api_id":"buicef10_1","name":"date","type":"text-merge","x":513,"y":92,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_2","name":"customer","type":"text-merge","x":87,"y":106,"width":316,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_3","name":"county","type":"text-merge","x":300,"y":106,"width":220,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_4","name":"rate","type":"text-merge","x":539,"y":106,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_5","name":"street","type":"text-merge","x":129,"y":120,"width":388,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_6","name":"city","type":"text-merge","x":358,"y":120,"width":190,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_7","name":"state","type":"text-merge","x":491,"y":120,"width":56,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_8","name":"zip","type":"text-merge","x":539,"y":120,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_9","name":"phone2","type":"text-merge","x":137,"y":134,"width":190,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_10","name":"width","type":"text-merge","x":167,"y":152,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_11","name":"length","type":"text-merge","x":285,"y":152,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_12","name":"height","type":"text-merge","x":392,"y":152,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_13","name":"top","type":"text-merge","x":167,"y":169,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_14","name":"sides","type":"text-merge","x":285,"y":169,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_15","name":"trim","type":"text-merge","x":392,"y":169,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_16","name":"gauge14","type":"checkbox-merge","x":112,"y":185,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_17","name":"gauge12","type":"checkbox-merge","x":172,"y":185,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_18","name":"certified","type":"checkbox-merge","x":223,"y":185,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_19","name":"uncertified","type":"checkbox-merge","x":335,"y":185,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_20","name":"price","type":"text-merge","x":500,"y":174,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_21","name":"tax","type":"text-merge","x":500,"y":212,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_22","name":"subtotal","type":"text-merge","x":500,"y":254,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_23","name":"downpayment","type":"text-merge","x":500,"y":297,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_24","name":"total","type":"text-merge","x":500,"y":349,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_25","name":"balance","type":"text-merge","x":500,"y":427,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_26","name":"qty1","type":"text-merge","x":30,"y":201,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_27","name":"line1","type":"text-merge","x":128,"y":201,"width":484,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_28","name":"price1","type":"text-merge","x":378,"y":201,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_29","name":"qty2","type":"text-merge","x":30,"y":217,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_30","name":"line2","type":"text-merge","x":128,"y":217,"width":484,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_31","name":"price2","type":"text-merge","x":378,"y":217,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_32","name":"qty3","type":"text-merge","x":30,"y":232,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_33","name":"line3","type":"text-merge","x":128,"y":232,"width":484,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_34","name":"price3","type":"text-merge","x":378,"y":232,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_35","name":"qty4","type":"text-merge","x":30,"y":248,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_36","name":"line4","type":"text-merge","x":128,"y":248,"width":484,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_37","name":"price4","type":"text-merge","x":378,"y":248,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_38","name":"roofReg","type":"checkbox-merge","x":120,"y":551,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_39","name":"roofAframe","type":"checkbox-merge","x":201,"y":551,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_40","name":"roofVert","type":"checkbox-merge","x":282,"y":551,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_41","name":"installGround","type":"checkbox-merge","x":120,"y":584,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_42","name":"installCement","type":"checkbox-merge","x":201,"y":584,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_43","name":"installAsphalt","type":"checkbox-merge","x":282,"y":584,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_44","name":"Customer","type":"signature","x":79,"y":703,"width":338,"height":20,"required":true,"signer":"0","page":1},{"api_id":"buicef10_45","name":"email","type":"text-merge","x":60,"y":726,"width":382,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_46","name":"qty5","type":"text-merge","x":30,"y":264,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_47","name":"line5","type":"text-merge","x":128,"y":264,"width":484,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_48","name":"price5","type":"text-merge","x":378,"y":264,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_49","name":"qty6","type":"text-merge","x":30,"y":280,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_50","name":"line6","type":"text-merge","x":128,"y":280,"width":484,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_51","name":"price6","type":"text-merge","x":378,"y":280,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_52","name":"qty7","type":"text-merge","x":30,"y":296,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_53","name":"line7","type":"text-merge","x":128,"y":296,"width":484,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_54","name":"price7","type":"text-merge","x":378,"y":296,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_55","name":"qty8","type":"text-merge","x":30,"y":312,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_56","name":"line8","type":"text-merge","x":128,"y":312,"width":484,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_57","name":"price8","type":"text-merge","x":378,"y":312,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_58","name":"qty9","type":"text-merge","x":30,"y":328,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_59","name":"line9","type":"text-merge","x":128,"y":328,"width":484,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_60","name":"price9","type":"text-merge","x":378,"y":328,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_61","name":"qty10","type":"text-merge","x":30,"y":344,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_62","name":"line10","type":"text-merge","x":128,"y":344,"width":484,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_63","name":"price10","type":"text-merge","x":378,"y":344,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_64","name":"qty11","type":"text-merge","x":30,"y":360,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_65","name":"qty12","type":"text-merge","x":30,"y":376,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_66","name":"qty13","type":"text-merge","x":30,"y":392,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_67","name":"qty14","type":"text-merge","x":30,"y":407,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_68","name":"qty15","type":"text-merge","x":30,"y":424,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_69","name":"qty16","type":"text-merge","x":30,"y":439,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_70","name":"qty17","type":"text-merge","x":30,"y":455,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_71","name":"qty18","type":"text-merge","x":30,"y":471,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_72","name":"qty19","type":"text-merge","x":30,"y":487,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_73","name":"qty20","type":"text-merge","x":30,"y":503,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_74","name":"qty21","type":"text-merge","x":30,"y":519,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_75","name":"line11","type":"text-merge","x":128,"y":360,"width":484,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_76","name":"line12","type":"text-merge","x":128,"y":376,"width":484,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_77","name":"line13","type":"text-merge","x":128,"y":392,"width":484,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_78","name":"line14","type":"text-merge","x":128,"y":407,"width":484,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_79","name":"line15","type":"text-merge","x":128,"y":424,"width":484,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_80","name":"line16","type":"text-merge","x":128,"y":439,"width":484,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_81","name":"line17","type":"text-merge","x":128,"y":455,"width":484,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_82","name":"line18","type":"text-merge","x":128,"y":471,"width":484,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_83","name":"line19","type":"text-merge","x":128,"y":487,"width":484,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_84","name":"line20","type":"text-merge","x":128,"y":503,"width":484,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_85","name":"line21","type":"text-merge","x":128,"y":519,"width":484,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_86","name":"price11","type":"text-merge","x":378,"y":360,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_87","name":"price12","type":"text-merge","x":378,"y":376,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_88","name":"price13","type":"text-merge","x":378,"y":392,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_90","name":"price14","type":"text-merge","x":378,"y":407,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_91","name":"price15","type":"text-merge","x":378,"y":424,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_92","name":"price16","type":"text-merge","x":378,"y":439,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_93","name":"price17","type":"text-merge","x":378,"y":455,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_94","name":"price18","type":"text-merge","x":378,"y":471,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_95","name":"price19","type":"text-merge","x":378,"y":487,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_96","name":"price20","type":"text-merge","x":378,"y":503,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_97","name":"powerYes","type":"checkbox-merge","x":467,"y":567,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_98","name":"powerNo","type":"checkbox-merge","x":499,"y":567,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_99","name":"installWood","type":"checkbox-merge","x":387,"y":584,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_100","name":"customer2","type":"text-merge","x":79,"y":657,"width":316,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_101","name":"dpRate","type":"text-merge","x":455,"y":314,"width":39,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"buicef10_102","name":"price21","type":"text-merge","x":378,"y":519,"width":100,"height":16,"required":false,"signer":"sender","page":1}
        ],

        // Generic Door Location Form
        [
            {"api_id":"ef1cef11_3","name":"width2","type":"text-merge","x":78,"y":97,"width":250,"height":16,"required":false,"signer":"sender","page":1},
            {"api_id":"ef1cef11_4","name":"length2","type":"text-merge","x":78,"y":114,"width":250,"height":16,"required":false,"signer":"sender","page":1},
            {"api_id":"ef1cef11_5","name":"height2","type":"text-merge","x":100,"y":129,"width":250,"height":16,"required":false,"signer":"sender","page":1},
            {"api_id":"ef1cef11_2","name":"customer2","type":"text-merge","x":570,"y":146,"width":250,"height":16,"required":false,"signer":"sender","page":1},
        ],

        // Generic Roof Waiver
        [
            {"api_id":"ef1cef12_1","name":"customer2","type":"text-merge","x":90,"y":540,"width":220,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef12_2","name":"dateSigned","type":"date_signed","x":90,"y":586,"width":220,"height":16,"required":true,"signer":"0","page":1},{"api_id":"ef1cef12_03","name":"Customer","type":"signature","x":90,"y":640,"width":220,"height":16,"required":true,"signer":0,"page":1},
        ],
    ],

    SBS: [
        
        // contract
        [
           {"api_id":"ef1cef10_1","name":"customer","type":"text-merge","x":113,"y":110,"width":350,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_2","name":"county","type":"text-merge","x":352,"y":110,"width":220,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_3","name":"rate","type":"text-merge","x":507,"y":110,"width":144,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_4","name":"street","type":"text-merge","x":77,"y":128,"width":344,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_5","name":"city","type":"text-merge","x":296,"y":128,"width":288,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_6","name":"state","type":"text-merge","x":488,"y":128,"width":30,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_7","name":"zip","type":"text-merge","x":546,"y":128,"width":68,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_8","name":"phone2","type":"text-merge","x":470,"y":159,"width":220,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_9","name":"date","type":"text-merge","x":392,"y":73,"width":258,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_10","name":"roofReg","type":"checkbox-merge","x":128,"y":191,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_11","name":"roofAframe","type":"checkbox-merge","x":244,"y":191,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_12","name":"roofVert","type":"checkbox-merge","x":352,"y":191,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_13","name":"price","type":"text-merge","x":505,"y":207,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_14","name":"tax","type":"text-merge","x":505,"y":245,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_15","name":"subtotal","type":"text-merge","x":505,"y":280,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_16","name":"downpayment","type":"text-merge","x":505,"y":314,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_17","name":"balance","type":"text-merge","x":505,"y":348,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_19","name":"Customer","type":"signature","x":91,"y":734,"width":322,"height":20,"required":true,"signer":"0","page":1},{"api_id":"ef1cef10_20","name":"email","type":"text-merge","x":91,"y":750,"width":322,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_21","name":"installCement","type":"checkbox-merge","x":185,"y":484,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_22","name":"installGround","type":"checkbox-merge","x":271,"y":484,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_23","name":"installAsphalt","type":"checkbox-merge","x":334,"y":484,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_24","name":"installOther","type":"checkbox-merge","x":405,"y":484,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_25","name":"buyer","type":"text-merge","x":129,"y":614,"width":200,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_26","name":"powerYes","type":"checkbox-merge","x":163,"y":496,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_27","name":"powerNo","type":"checkbox-merge","x":224,"y":496,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_28","name":"streetInst","type":"text-merge","x":114,"y":145,"width":270,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_29","name":"cityInstall","type":"text-merge","x":296,"y":145,"width":288,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_30","name":"stateInstall","type":"text-merge","x":488,"y":143,"width":30,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_31","name":"zipInst","type":"text-merge","x":547,"y":143,"width":68,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_32","name":"groundLevel","type":"text-merge","x":432,"y":497,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_33","name":"top","type":"text-merge","x":113,"y":509,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_34","name":"sides","type":"text-merge","x":113,"y":521,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_35","name":"ends","type":"text-merge","x":113,"y":533,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_36","name":"trim","type":"text-merge","x":113,"y":545,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_37","name":"width","type":"text-merge","x":93,"y":233,"width":70,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_38","name":"height","type":"text-merge","x":190,"y":233,"width":70,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_39","name":"length","type":"text-merge","x":229,"y":233,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_40","name":"gauge","type":"text-merge","x":294,"y":233,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_41","name":"buildOverYes","type":"checkbox-merge","x":315,"y":496,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_43","name":"dealerName","type":"text-merge","x":392,"y":30,"width":264,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_44","name":"dealerPhone","type":"text-merge","x":392,"y":50,"width":264,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_45","name":"line1","type":"text-merge","x":132,"y":256,"width":430,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_46","name":"line2","type":"text-merge","x":132,"y":268,"width":430,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_47","name":"line3","type":"text-merge","x":132,"y":280,"width":430,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_48","name":"line4","type":"text-merge","x":132,"y":292,"width":430,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_49","name":"line5","type":"text-merge","x":132,"y":316,"width":430,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_50","name":"line6","type":"text-merge","x":132,"y":328,"width":430,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_51","name":"line7","type":"text-merge","x":132,"y":340,"width":430,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_52","name":"line8","type":"text-merge","x":132,"y":352,"width":430,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_53","name":"line9","type":"text-merge","x":132,"y":364,"width":430,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_54","name":"line10","type":"text-merge","x":132,"y":377,"width":430,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_55","name":"line11","type":"text-merge","x":132,"y":388,"width":430,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_56","name":"line12","type":"text-merge","x":132,"y":400,"width":430,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_57","name":"line13","type":"text-merge","x":132,"y":412,"width":430,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_58","name":"line14","type":"text-merge","x":132,"y":424,"width":430,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_59","name":"line15","type":"text-merge","x":132,"y":436,"width":430,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_60","name":"line16","type":"text-merge","x":132,"y":449,"width":430,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_61","name":"line17","type":"text-merge","x":132,"y":461,"width":430,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_62","name":"qty9","type":"text-merge","x":94,"y":364,"width":60,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_63","name":"qty10","type":"text-merge","x":94,"y":377,"width":60,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_64","name":"qty11","type":"text-merge","x":94,"y":388,"width":60,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_65","name":"qty12","type":"text-merge","x":94,"y":400,"width":60,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_66","name":"price1","type":"text-merge","x":352,"y":256,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_67","name":"price2","type":"text-merge","x":352,"y":268,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_68","name":"price3","type":"text-merge","x":352,"y":280,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_69","name":"price4","type":"text-merge","x":352,"y":292,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_70","name":"price5","type":"text-merge","x":352,"y":316,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_71","name":"price6","type":"text-merge","x":352,"y":328,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_72","name":"price7","type":"text-merge","x":352,"y":340,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_73","name":"price8","type":"text-merge","x":352,"y":352,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_74","name":"price9","type":"text-merge","x":352,"y":364,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_75","name":"price10","type":"text-merge","x":352,"y":377,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_76","name":"price11","type":"text-merge","x":352,"y":388,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_77","name":"price12","type":"text-merge","x":352,"y":401,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_78","name":"price13","type":"text-merge","x":352,"y":412,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_79","name":"price14","type":"text-merge","x":352,"y":424,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_80","name":"price15","type":"text-merge","x":352,"y":436,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_81","name":"price16","type":"text-merge","x":352,"y":449,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_82","name":"price17","type":"text-merge","x":353,"y":461,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_83","name":"qty1","type":"text-merge","x":94,"y":256,"width":60,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_84","name":"qty2","type":"text-merge","x":94,"y":268,"width":60,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_85","name":"qty3","type":"text-merge","x":94,"y":280,"width":60,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_86","name":"qty4","type":"text-merge","x":94,"y":292,"width":60,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_87","name":"qty5","type":"text-merge","x":94,"y":316,"width":60,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_88","name":"qty6","type":"text-merge","x":94,"y":328,"width":60,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_89","name":"qty7","type":"text-merge","x":94,"y":340,"width":60,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_90","name":"qty8","type":"text-merge","x":94,"y":352,"width":60,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_91","name":"qty13","type":"text-merge","x":94,"y":412,"width":60,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_92","name":"qty14","type":"text-merge","x":94,"y":424,"width":60,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_93","name":"qty15","type":"text-merge","x":94,"y":436,"width":60,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_94","name":"qty16","type":"text-merge","x":94,"y":449,"width":60,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_95","name":"qty17","type":"text-merge","x":94,"y":461,"width":60,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_96","name":"balanceLabor","type":"text-merge","x":505,"y":395,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_97","name":"cardBalanceDue","type":"text-merge","x":505,"y":465,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_98","name":"Customer","type":"signature","x":17,"y":689,"width":150,"height":20,"required":true,"signer":"0","page":1},{"api_id":"ef1cef10_99","name":"Customer","type":"signature","x":255,"y":689,"width":150,"height":20,"required":true,"signer":"0","page":1},{"api_id":"ef1cef10_100","name":"Customer","type":"signature","x":17,"y":715,"width":150,"height":20,"required":true,"signer":"0","page":1},{"api_id":"ef1cef10_101","name":"Customer","type":"signature","x":255,"y":715,"width":150,"height":20,"required":true,"signer":"0","page":1},{"api_id":"ef1cef10_102","name":"roofLength","type":"text-merge","x":132,"y":233,"width":106,"height":16,"required":false,"signer":"sender","page":1} 
        ],

        // Generic Door Location Form
        [
            
        ],

        // Generic Roof Waiver
        [
            {"api_id":"ef1cef12_1","name":"customer2","type":"text-merge","x":90,"y":540,"width":220,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef12_2","name":"dateSigned","type":"date_signed","x":90,"y":586,"width":220,"height":16,"required":true,"signer":"0","page":1},{"api_id":"ef1cef12_03","name":"Customer","type":"signature","x":90,"y":640,"width":220,"height":16,"required":true,"signer":0,"page":1},
        ],
    ],

    Interstate: [
        
        // contract
        [
            {"api_id":"ef1cef10_1","name":"date","type":"text-merge","x":538,"y":84,"width":140,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_2","name":"customer","type":"text-merge","x":34,"y":97,"width":348,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_3","name":"street","type":"text-merge","x":43,"y":109,"width":330,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_4","name":"state","type":"text-merge","x":34,"y":120,"width":78,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_5","name":"zip","type":"text-merge","x":93,"y":120,"width":230,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_6","name":"streetInst","type":"text-merge","x":65,"y":132,"width":696,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_7","name":"city","type":"text-merge","x":234,"y":109,"width":360,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_8","name":"county","type":"text-merge","x":244,"y":120,"width":340,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_9","name":"phone2","type":"text-merge","x":260,"y":143,"width":310,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_10","name":"email","type":"text-merge","x":34,"y":155,"width":760,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_11","name":"top","type":"text-merge","x":90,"y":190,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_12","name":"sides","type":"text-merge","x":206,"y":190,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_13","name":"trim","type":"text-merge","x":320,"y":190,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_14","name":"certified","type":"checkbox-merge","x":71,"y":203,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_15","name":"uncertified","type":"checkbox-merge","x":102,"y":203,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_16","name":"gauge12","type":"checkbox-merge","x":229,"y":203,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_17","name":"gauge14","type":"checkbox-merge","x":258,"y":203,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_18","name":"price","type":"text-merge","x":560,"y":199,"width":90,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_19","name":"rate","type":"text-merge","x":458,"y":227,"width":60,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_20","name":"tax","type":"text-merge","x":560,"y":227,"width":90,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_21","name":"subtotal","type":"text-merge","x":560,"y":255,"width":90,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_22","name":"downpayment","type":"text-merge","x":560,"y":281,"width":90,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_23","name":"total","type":"text-merge","x":560,"y":310,"width":90,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_24","name":"balance","type":"text-merge","x":560,"y":495,"width":90,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_25","name":"Customer","type":"signature","x":21,"y":700,"width":260,"height":20,"required":true,"signer":"0","page":1},{"api_id":"ef1cef10_26","name":"dateSigned","type":"date_signed","x":173,"y":700,"width":100,"height":20,"required":true,"signer":"0","page":1},{"api_id":"ef1cef10_27","name":"powerYes","type":"checkbox-merge","x":132,"y":554,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_28","name":"powerNo","type":"checkbox-merge","x":167,"y":554,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_29","name":"groundLevelYes","type":"checkbox-merge","x":132,"y":538,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_30","name":"groundLevelNo","type":"checkbox-merge","x":167,"y":538,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_31","name":"installGround","type":"checkbox-merge","x":202,"y":569,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_32","name":"installConcrete","type":"checkbox-merge","x":142,"y":569,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_33","name":"installOther","type":"checkbox-merge","x":252,"y":569,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_34","name":"customer","type":"text-merge","x":437,"y":617,"width":260,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_35","name":"line1","type":"text-merge","x":68,"y":260,"width":490,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_36","name":"qty1","type":"text-merge","x":318,"y":260,"width":60,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_37","name":"price1","type":"text-merge","x":358,"y":260,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_38","name":"line2","type":"text-merge","x":68,"y":274,"width":490,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_39","name":"qty2","type":"text-merge","x":318,"y":274,"width":60,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_40","name":"price2","type":"text-merge","x":358,"y":274,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_41","name":"dealerName","type":"text-merge","x":447,"y":97,"width":316,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_42","name":"dealerPhone","type":"text-merge","x":447,"y":132,"width":316,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_43","name":"line3","type":"text-merge","x":68,"y":288,"width":490,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_44","name":"qty3","type":"text-merge","x":318,"y":288,"width":60,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_45","name":"price3","type":"text-merge","x":358,"y":288,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_46","name":"line4","type":"text-merge","x":68,"y":302,"width":490,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_47","name":"qty4","type":"text-merge","x":318,"y":302,"width":60,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_48","name":"price4","type":"text-merge","x":358,"y":302,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_49","name":"line5","type":"text-merge","x":68,"y":316,"width":490,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_50","name":"qty5","type":"text-merge","x":318,"y":316,"width":60,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_51","name":"price5","type":"text-merge","x":358,"y":316,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_52","name":"line6","type":"text-merge","x":68,"y":330,"width":490,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_53","name":"qty6","type":"text-merge","x":318,"y":330,"width":60,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_54","name":"price6","type":"text-merge","x":358,"y":330,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_55","name":"line7","type":"text-merge","x":68,"y":344,"width":490,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_56","name":"qty7","type":"text-merge","x":318,"y":344,"width":60,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_57","name":"price7","type":"text-merge","x":358,"y":344,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_58","name":"line8","type":"text-merge","x":68,"y":359,"width":490,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_59","name":"qty8","type":"text-merge","x":318,"y":359,"width":60,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_60","name":"price8","type":"text-merge","x":358,"y":359,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_61","name":"line9","type":"text-merge","x":68,"y":373,"width":490,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_62","name":"qty9","type":"text-merge","x":318,"y":373,"width":60,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_63","name":"price9","type":"text-merge","x":358,"y":373,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_64","name":"line10","type":"text-merge","x":68,"y":387,"width":490,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_65","name":"qty10","type":"text-merge","x":318,"y":387,"width":60,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_66","name":"price10","type":"text-merge","x":358,"y":387,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_67","name":"line11","type":"text-merge","x":68,"y":401,"width":490,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_68","name":"qty11","type":"text-merge","x":318,"y":401,"width":60,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_69","name":"price11","type":"text-merge","x":358,"y":401,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_70","name":"line12","type":"text-merge","x":68,"y":415,"width":490,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_71","name":"qty12","type":"text-merge","x":318,"y":415,"width":60,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_72","name":"price12","type":"text-merge","x":358,"y":415,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_73","name":"line13","type":"text-merge","x":68,"y":429,"width":490,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_74","name":"qty13","type":"text-merge","x":318,"y":429,"width":60,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_75","name":"price13","type":"text-merge","x":358,"y":429,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_76","name":"line14","type":"text-merge","x":68,"y":443,"width":490,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_77","name":"qty14","type":"text-merge","x":318,"y":443,"width":60,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_78","name":"price14","type":"text-merge","x":358,"y":443,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_79","name":"line15","type":"text-merge","x":68,"y":457,"width":490,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_80","name":"qty15","type":"text-merge","x":318,"y":457,"width":60,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_81","name":"price15","type":"text-merge","x":358,"y":457,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_82","name":"width","type":"text-merge","x":101,"y":230,"width":64,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_83","name":"roofReg","type":"checkbox-merge","x":71,"y":245,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_84","name":"roofVert","type":"checkbox-merge","x":131,"y":245,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_85","name":"roofAframe","type":"checkbox-merge","x":227,"y":245,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_86","name":"roofSize","type":"text-merge","x":153,"y":230,"width":64,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_87","name":"baseSize","type":"text-merge","x":208,"y":230,"width":60,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_88","name":"legHeight","type":"text-merge","x":278,"y":230,"width":64,"height":16,"required":false,"signer":"sender","page":1},
            {"api_id":"ef1cef10_89","name":"Customer","type":"signature","x":30,"y":720,"width":200,"height":20,"required":true,"signer":"0","page":2},{"api_id":"ef1cef10_90","name":"dateSigned","type":"date_signed","x":235,"y":720,"width":100,"height":20,"required":true,"signer":"0","page":2}
        ],
        
        // Generic Door Location Form
        [
            
        ],

        // Generic Roof Waiver
        [
            {"api_id":"ef1cef12_1","name":"customer2","type":"text-merge","x":90,"y":540,"width":220,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef12_2","name":"dateSigned","type":"date_signed","x":90,"y":586,"width":220,"height":16,"required":true,"signer":"0","page":1},{"api_id":"ef1cef12_03","name":"Customer","type":"signature","x":90,"y":640,"width":220,"height":16,"required":true,"signer":0,"page":1},
        ]
    ],

    American: [
        
        // contract
        [
            {"api_id":"ef1cef10_1","name":"date","type":"text-merge","x":486,"y":85,"width":202,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_2","name":"customer","type":"text-merge","x":95,"y":101,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_3","name":"street","type":"text-merge","x":95,"y":114,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_4","name":"phone2","type":"text-merge","x":95,"y":127,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_5","name":"city","type":"text-merge","x":317,"y":114,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_6","name":"state","type":"text-merge","x":456,"y":114,"width":60,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_7","name":"zip","type":"text-merge","x":509,"y":114,"width":158,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_8","name":"email","type":"text-merge","x":354,"y":127,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_9","name":"price","type":"text-merge","x":500,"y":183,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_10","name":"tax","type":"text-merge","x":500,"y":202,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_11","name":"subtotal","type":"text-merge","x":500,"y":221,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_12","name":"total","type":"text-merge","x":500,"y":296,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_13","name":"downpayment","type":"text-merge","x":500,"y":315,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_14","name":"balance","type":"text-merge","x":500,"y":330,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_15","name":"building","type":"checkbox-merge","x":288,"y":165,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_16","name":"width","type":"text-merge","x":90,"y":199,"width":80,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_17","name":"gauge","type":"text-merge","x":295,"y":199,"width":80,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_18","name":"basePrice","type":"text-merge","x":355,"y":199,"width":80,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_19","name":"top","type":"text-merge","x":80,"y":471,"width":90,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_20","name":"sides","type":"text-merge","x":157,"y":471,"width":86,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_21","name":"ends","type":"text-merge","x":80,"y":487,"width":90,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_22","name":"trim","type":"text-merge","x":150,"y":487,"width":98,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_23","name":"Customer","type":"signature","x":81,"y":738,"width":374,"height":16,"required":true,"signer":"0","page":1},{"api_id":"ef1cef10_24","name":"powerYes","type":"checkbox-merge","x":258,"y":487,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_25","name":"powerNo","type":"checkbox-merge","x":298,"y":487,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_26","name":"groundLevelYes","type":"checkbox-merge","x":258,"y":470,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_27","name":"groundLevelNo","type":"checkbox-merge","x":298,"y":470,"width":100,"height":16,"required":false,"signer":"sender","page":1}
        ],

        // Generic Door Location Form
        [
            
        ],

        // Generic Roof Waiver
        [
            {"api_id":"ef1cef12_1","name":"customer2","type":"text-merge","x":90,"y":540,"width":220,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef12_2","name":"dateSigned","type":"date_signed","x":90,"y":586,"width":220,"height":16,"required":true,"signer":"0","page":1},{"api_id":"ef1cef12_03","name":"Customer","type":"signature","x":90,"y":640,"width":220,"height":16,"required":true,"signer":0,"page":1},
        ],
    ],

    AmericanCAShop: [
        
        // contract
        [
            {"api_id":"ef1cef10_1","name":"date","type":"text-merge","x":500,"y":72,"width":186,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_2","name":"customer","type":"text-merge","x":90,"y":90,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_3","name":"street","type":"text-merge","x":90,"y":107,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_4","name":"phone2","type":"text-merge","x":90,"y":123,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_5","name":"city","type":"text-merge","x":332,"y":107,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_6","name":"state","type":"text-merge","x":473,"y":107,"width":60,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_7","name":"zip","type":"text-merge","x":520,"y":107,"width":148,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_8","name":"email","type":"text-merge","x":313,"y":123,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_9","name":"price","type":"text-merge","x":507,"y":177,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_10","name":"tax","type":"text-merge","x":508,"y":196,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_11","name":"subtotal","type":"text-merge","x":508,"y":215,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_12","name":"total","type":"text-merge","x":506,"y":290,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_13","name":"downpayment","type":"text-merge","x":506,"y":309,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_14","name":"balance","type":"text-merge","x":507,"y":324,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_15","name":"Customer","type":"signature","x":20,"y":731,"width":380,"height":16,"required":true,"signer":"0","page":1}
        ],

        // Generic Door Location Form
        [
            
        ],

        // Generic Roof Waiver
        [
            {"api_id":"ef1cef12_1","name":"customer2","type":"text-merge","x":90,"y":540,"width":220,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef12_2","name":"dateSigned","type":"date_signed","x":90,"y":586,"width":220,"height":16,"required":true,"signer":"0","page":1},{"api_id":"ef1cef12_03","name":"Customer","type":"signature","x":90,"y":640,"width":220,"height":16,"required":true,"signer":0,"page":1},
        ],
    ],

    CarportNetwork: [
        
        // contract
        [
            {"api_id":"ef1cef10_1","name":"date","type":"text-merge","x":447,"y":95,"width":276,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_2","name":"customer","type":"text-merge","x":86,"y":95,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_3","name":"street","type":"text-merge","x":86,"y":109,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_4","name":"city","type":"text-merge","x":86,"y":123,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_5","name":"state","type":"text-merge","x":281,"y":123,"width":50,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_6","name":"zip","type":"text-merge","x":327,"y":123,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_7","name":"county","type":"text-merge","x":457,"y":123,"width":248,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_8","name":"phone2","type":"text-merge","x":86,"y":136,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_9","name":"email","type":"text-merge","x":294,"y":136,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_10","name":"Customer","type":"signature","x":26,"y":719,"width":466,"height":16,"required":true,"signer":"0","page":1},{"api_id":"ef1cef10_11","name":"gauge14","type":"checkbox-merge","x":101,"y":197,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_12","name":"gauge12","type":"checkbox-merge","x":160,"y":197,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_13","name":"roofReg","type":"checkbox-merge","x":101,"y":225,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_14","name":"roofAframe","type":"checkbox-merge","x":149,"y":225,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_15","name":"roofVert","type":"checkbox-merge","x":255,"y":225,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_16","name":"top","type":"text-merge","x":112,"y":211,"width":90,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_17","name":"trim","type":"text-merge","x":189,"y":211,"width":90,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_18","name":"sides","type":"text-merge","x":277,"y":211,"width":90,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_19","name":"price","type":"text-merge","x":510,"y":183,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_20","name":"basePrice","type":"text-merge","x":330,"y":183,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_21","name":"tax","type":"text-merge","x":510,"y":198,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_22","name":"subtotal","type":"text-merge","x":510,"y":210,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_23","name":"downpayment","type":"text-merge","x":510,"y":224,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_24","name":"balance","type":"text-merge","x":510,"y":294,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_28","name":"groundLevelYes","type":"checkbox-merge","x":425,"y":334,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_29","name":"groundLevelNo","type":"checkbox-merge","x":445,"y":334,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_30","name":"powerYes","type":"checkbox-merge","x":532,"y":334,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_31","name":"powerNo","type":"checkbox-merge","x":561,"y":334,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_32","name":"installGround","type":"checkbox-merge","x":475,"y":349,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_33","name":"installCement","type":"checkbox-merge","x":532,"y":349,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_34","name":"installOther","type":"checkbox-merge","x":475,"y":362,"width":100,"height":16,"required":false,"signer":"sender","page":1}
        ],

        // Generic Door Location Form
        [
            
        ],

        // Generic Roof Waiver
        [
            {"api_id":"ef1cef12_1","name":"customer2","type":"text-merge","x":90,"y":540,"width":220,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef12_2","name":"dateSigned","type":"date_signed","x":90,"y":586,"width":220,"height":16,"required":true,"signer":"0","page":1},{"api_id":"ef1cef12_03","name":"Customer","type":"signature","x":90,"y":640,"width":220,"height":16,"required":true,"signer":0,"page":1},
        ],
    ],

    Dreams: [

        // contract
        [
            {"api_id":"ef1cef10_1","name":"customer","type":"text-merge","x":89,"y":141,"width":635,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_2","name":"county","type":"text-merge","x":492,"y":129,"width":170,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_3","name":"street","type":"text-merge","x":89,"y":154,"width":242,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_4","name":"city","type":"text-merge","x":245,"y":154,"width":190,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_5","name":"state","type":"text-merge","x":372,"y":154,"width":178,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_6","name":"zip","type":"text-merge","x":492,"y":154,"width":170,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_7","name":"phone2","type":"text-merge","x":196,"y":166,"width":210,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_8","name":"street","type":"text-merge","x":104,"y":179,"width":946,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_9","name":"email","type":"text-merge","x":74,"y":194,"width":240,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_10","name":"uncertified","type":"checkbox-merge","x":440,"y":193,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_11","name":"certified","type":"checkbox-merge","x":151,"y":218,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_12","name":"gauge14","type":"checkbox-merge","x":151,"y":244,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_13","name":"gauge12","type":"checkbox-merge","x":198,"y":244,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_14","name":"width","type":"text-merge","x":286,"y":244,"width":64,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_15","name":"length","type":"text-merge","x":358,"y":244,"width":64,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_16","name":"height","type":"text-merge","x":358,"y":257,"width":64,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_17","name":"subtotal","type":"text-merge","x":500,"y":277,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_18","name":"downpayment","type":"text-merge","x":500,"y":371,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_19","name":"balance","type":"text-merge","x":500,"y":565,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_20","name":"Customer","type":"signature","x":41,"y":699,"width":162,"height":16,"required":"true","signer":"0","page":1},{"api_id":"ef1cef10_21","name":"dateSigned","type":"date_signed","x":131,"y":699,"width":148,"height":16,"required":"true","signer":"0","page":1},{"api_id":"ef1cef10_22","name":"date","type":"text-merge","x":358,"y":128,"width":100,"height":16,"required":false,"signer":"sender","page":1}
        ],
        
        //
        [],
        
        //
        [],

        // door waiver?
        []

    ],

    WestCoast: [
        
        // contract
        [
            {"api_id":"ef1cef10_1","name":"date","type":"text-merge","x":473,"y":119,"width":204,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_2","name":"customer","type":"text-merge","x":134,"y":141,"width":604,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_3","name":"county","type":"text-merge","x":491,"y":141,"width":168,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_4","name":"street","type":"text-merge","x":89,"y":163,"width":974,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_5","name":"phone2","type":"text-merge","x":320,"y":191,"width":184,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_6","name":"gauge12","type":"checkbox-merge","x":239,"y":209,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_7","name":"gauge14","type":"checkbox-merge","x":299,"y":209,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_8","name":"roofAframe","type":"checkbox-merge","x":224,"y":226,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_9","name":"roofReg","type":"checkbox-merge","x":291,"y":226,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_10","name":"top","type":"text-merge","x":115,"y":391,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_11","name":"trim","type":"text-merge","x":250,"y":391,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_12","name":"installConcrete","type":"checkbox-merge","x":208,"y":408,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_13","name":"installGround","type":"checkbox-merge","x":287,"y":408,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_14","name":"basePrice","type":"text-merge","x":382,"y":210,"width":80,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_15","name":"price","type":"text-merge","x":510,"y":235,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_16","name":"rate","type":"text-merge","x":457,"y":253,"width":48,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_17","name":"tax","type":"text-merge","x":510,"y":257,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_18","name":"total","type":"text-merge","x":510,"y":279,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_19","name":"downpayment","type":"text-merge","x":510,"y":323,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_20","name":"balance","type":"text-merge","x":510,"y":356,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_21","name":"Customer","type":"signature","x":112,"y":729,"width":358,"height":16,"required":true,"signer":"0","page":1},{"api_id":"ef1cef10_22","name":"installWood","type":"checkbox-merge","x":354,"y":408,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_23","name":"powerYes","type":"checkbox-merge","x":120,"y":408,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_24","name":"powerNo","type":"checkbox-merge","x":158,"y":408,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_25","name":"groundLevelYes","type":"checkbox-merge","x":472,"y":408,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_26","name":"groundLevelNo","type":"checkbox-merge","x":509,"y":408,"width":100,"height":16,"required":false,"signer":"sender","page":1}
        ],

        // Generic Door Location Form
        [
            
        ],

        // Generic Roof Waiver
        [
            {"api_id":"ef1cef12_1","name":"customer2","type":"text-merge","x":90,"y":540,"width":220,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef12_2","name":"dateSigned","type":"date_signed","x":90,"y":586,"width":220,"height":16,"required":true,"signer":"0","page":1},{"api_id":"ef1cef12_03","name":"Customer","type":"signature","x":90,"y":640,"width":220,"height":16,"required":true,"signer":0,"page":1},
        ],
    ],

    TriStateCarports: [
        
        // contract
        [
            {"api_id":"ef1cef10_1","name":"date","type":"text-merge","x":414,"y":136,"width":168,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_2","name":"customer","type":"text-merge","x":84,"y":164,"width":344,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_3","name":"county","type":"text-merge","x":309,"y":164,"width":208,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_4","name":"state","type":"text-merge","x":452,"y":178,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_5","name":"street","type":"text-merge","x":84,"y":178,"width":346,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_6","name":"city","type":"text-merge","x":309,"y":178,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_7","name":"phone2","type":"text-merge","x":309,"y":191,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_8","name":"zip","type":"text-merge","x":452,"y":191,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_9","name":"gauge14","type":"checkbox-merge","x":496,"y":202,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_10","name":"gauge12","type":"checkbox-merge","x":554,"y":202,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_11","name":"certified","type":"checkbox-merge","x":546,"y":230,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_12","name":"uncertified","type":"checkbox-merge","x":546,"y":243,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_13","name":"roofReg","type":"checkbox-merge","x":276,"y":318,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_14","name":"roofAframe","type":"checkbox-merge","x":356,"y":318,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_15","name":"roofvert","type":"checkbox-merge","x":433,"y":318,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_16","name":"building","type":"checkbox-merge","x":52,"y":318,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_17","name":"subtotal","type":"text-merge","x":519,"y":579,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_18","name":"tax","type":"text-merge","x":519,"y":595,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_19","name":"total","type":"text-merge","x":519,"y":610,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_20","name":"downpayment","type":"text-merge","x":519,"y":628,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_21","name":"balance","type":"text-merge","x":519,"y":645,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_22","name":"price1","type":"text-merge","x":519,"y":404,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_23","name":"price2","type":"text-merge","x":519,"y":418,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_24","name":"prive3","type":"text-merge","x":519,"y":432,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_25","name":"price4","type":"text-merge","x":519,"y":445,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_26","name":"price5","type":"text-merge","x":519,"y":460,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_27","name":"price6","type":"text-merge","x":519,"y":473,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_28","name":"price7","type":"text-merge","x":519,"y":487,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_29","name":"price8","type":"text-merge","x":519,"y":500,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_30","name":"price9","type":"text-merge","x":519,"y":513,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_31","name":"price10","type":"text-merge","x":519,"y":526,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_32","name":"price11","type":"text-merge","x":519,"y":539,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_33","name":"price12","type":"text-merge","x":519,"y":552,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_34","name":"price13","type":"text-merge","x":519,"y":565,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_35","name":"top","type":"text-merge","x":124,"y":218,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_36","name":"trim","type":"text-merge","x":124,"y":234,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_37","name":"sides","type":"text-merge","x":124,"y":248,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_38","name":"ends","type":"text-merge","x":124,"y":262,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_39","name":"Customer","type":"signature","x":88,"y":718,"width":100,"height":16,"required":true,"signer":"0","page":1},{"api_id":"ef1cef10_40","name":"dateSigned","type":"date_signed","x":450,"y":698,"width":100,"height":16,"required":true,"signer":"0","page":1},{"api_id":"ef1cef10_41","name":"Customer","type":"signature","x":140,"y":615,"width":100,"height":16,"required":true,"signer":"0","page":1}
        ],

        // Generic Door Location Form
        [
            
        ],

        // Generic Roof Waiver
        [
            {"api_id":"ef1cef12_1","name":"customer2","type":"text-merge","x":90,"y":540,"width":220,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef12_2","name":"dateSigned","type":"date_signed","x":90,"y":586,"width":220,"height":16,"required":true,"signer":"0","page":1},{"api_id":"ef1cef12_03","name":"Customer","type":"signature","x":90,"y":640,"width":220,"height":16,"required":true,"signer":0,"page":1},
        ],
    ],

    QualityCarports: [
        
        // contract
        [
            {"api_id":"ef1cef10_1","name":"customer","type":"text-merge","x":94,"y":176,"width":554,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_2","name":"street","type":"text-merge","x":94,"y":187,"width":212,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_3","name":"city","type":"text-merge","x":234,"y":187,"width":160,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_4","name":"state","type":"text-merge","x":345,"y":187,"width":148,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_5","name":"zip","type":"text-merge","x":449,"y":187,"width":148,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_6","name":"email","type":"text-merge","x":80,"y":224,"width":210,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_7","name":"uncertified","type":"checkbox-merge","x":403,"y":222,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_8","name":"Customer","type":"signature","x":52,"y":670,"width":130,"height":16,"required":true,"signer":"0","page":1},{"api_id":"ef1cef10_9","name":"dateSigned","type":"text-merge","x":132,"y":670,"width":106,"height":16,"required":false,"signer":"sender","page":1}
        ],

        // Generic Door Location Form
        [
            
        ],

        // Generic Roof Waiver
        [
            {"api_id":"ef1cef12_1","name":"customer2","type":"text-merge","x":90,"y":540,"width":220,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef12_2","name":"dateSigned","type":"date_signed","x":90,"y":586,"width":220,"height":16,"required":true,"signer":"0","page":1},{"api_id":"ef1cef12_03","name":"Customer","type":"signature","x":90,"y":640,"width":220,"height":16,"required":true,"signer":0,"page":1},
        ],
    ],

    Midwest: [
        
        // contract
        [
            {"api_id":"ef1cef10_1","name":"date","type":"text-merge","x":401,"y":91,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_2","name":"customer","type":"text-merge","x":106,"y":105,"width":386,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_3","name":"email","type":"text-merge","x":336,"y":104,"width":456,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_4","name":"street","type":"text-merge","x":115,"y":117,"width":376,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_5","name":"city","type":"text-merge","x":331,"y":117,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_6","name":"state","type":"text-merge","x":436,"y":117,"width":64,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_7","name":"zip","type":"text-merge","x":496,"y":117,"width":132,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_8","name":"phone2","type":"text-merge","x":60,"y":131,"width":300,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_9","name":"Customer","type":"signature","x":131,"y":692,"width":304,"height":16,"required":true,"signer":"0","page":1},{"api_id":"ef1cef10_10","name":"dateSigned","type":"date_signed","x":333,"y":692,"width":130,"height":16,"required":true,"signer":"0","page":1}
        ],

        // Generic Door Location Form
        [
            
        ],

        // Generic Roof Waiver
        [
            {"api_id":"ef1cef12_1","name":"customer2","type":"text-merge","x":90,"y":540,"width":220,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef12_2","name":"dateSigned","type":"date_signed","x":90,"y":586,"width":220,"height":16,"required":true,"signer":"0","page":1},{"api_id":"ef1cef12_03","name":"Customer","type":"signature","x":90,"y":640,"width":220,"height":16,"required":true,"signer":0,"page":1},
        ],
    ],

    Lonestar: [
        
        // contract
        [
            {"api_id":"ef1cef10_1","name":"date","type":"text-merge","x":497,"y":77,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_2","name":"customer","type":"text-merge","x":86,"y":94,"width":394,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_3","name":"streetInst","type":"text-merge","x":365,"y":94,"width":458,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_4","name":"city","type":"text-merge","x":53,"y":112,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_5","name":"state","type":"text-merge","x":282,"y":112,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_6","name":"zip","type":"text-merge","x":365,"y":112,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_7","name":"county","type":"text-merge","x":497,"y":112,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_8","name":"phone2","type":"text-merge","x":66,"y":128,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_9","name":"email","type":"text-merge","x":497,"y":128,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_10","name":"width","type":"text-merge","x":48,"y":152,"width":65,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_11","name":"length","type":"text-merge","x":122,"y":152,"width":90,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_12","name":"height","type":"text-merge","x":208,"y":152,"width":90,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_13","name":"sides","type":"text-merge","x":154,"y":181,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_14","name":"trim","type":"text-merge","x":351,"y":181,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_15","name":"qty1","type":"text-merge","x":20,"y":263,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_16","name":"line1","type":"text-merge","x":55,"y":263,"width":784,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_17","name":"price1","type":"text-merge","x":535,"y":263,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_18","name":"qty2","type":"text-merge","x":20,"y":276,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_19","name":"line2","type":"text-merge","x":55,"y":276,"width":784,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_20","name":"price2","type":"text-merge","x":535,"y":276,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_21","name":"subtotal","type":"text-merge","x":535,"y":601,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_22","name":"Customer","type":"signature","x":100,"y":720,"width":380,"height":20,"required":true,"signer":"0","page":1},{"api_id":"ef1cef10_23","name":"qty3","type":"text-merge","x":20,"y":290,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_24","name":"qty4","type":"text-merge","x":20,"y":303,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_25","name":"qty5","type":"text-merge","x":20,"y":317,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_26","name":"qty6","type":"text-merge","x":20,"y":330,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_27","name":"qty7","type":"text-merge","x":20,"y":344,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_28","name":"qty8","type":"text-merge","x":20,"y":357,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_29","name":"qty9","type":"text-merge","x":20,"y":371,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_30","name":"qty10","type":"text-merge","x":20,"y":384,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_31","name":"line3","type":"text-merge","x":55,"y":290,"width":784,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_32","name":"line4","type":"text-merge","x":55,"y":303,"width":784,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_33","name":"line5","type":"text-merge","x":55,"y":317,"width":784,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_34","name":"line6","type":"text-merge","x":55,"y":330,"width":784,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_35","name":"line7","type":"text-merge","x":55,"y":344,"width":784,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_36","name":"line8","type":"text-merge","x":55,"y":357,"width":784,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_37","name":"line9","type":"text-merge","x":55,"y":371,"width":784,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_38","name":"line10","type":"text-merge","x":55,"y":384,"width":784,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_39","name":"price3","type":"text-merge","x":535,"y":290,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_40","name":"price4","type":"text-merge","x":535,"y":303,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_41","name":"price5","type":"text-merge","x":535,"y":317,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_42","name":"price6","type":"text-merge","x":535,"y":330,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_43","name":"price7","type":"text-merge","x":535,"y":344,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_44","name":"price8","type":"text-merge","x":535,"y":357,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_45","name":"price9","type":"text-merge","x":535,"y":371,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_46","name":"price10","type":"text-merge","x":535,"y":384,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_47","name":"building","type":"text-merge","x":535,"y":236,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_48","name":"qty11","type":"text-merge","x":20,"y":399,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_49","name":"qty12","type":"text-merge","x":20,"y":413,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_50","name":"qty13","type":"text-merge","x":20,"y":426,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_51","name":"qty14","type":"text-merge","x":20,"y":439,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_52","name":"qty15","type":"text-merge","x":20,"y":452,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_53","name":"qty16","type":"text-merge","x":20,"y":466,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_54","name":"qty17","type":"text-merge","x":20,"y":479,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_55","name":"qty18","type":"text-merge","x":20,"y":493,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_56","name":"qty19","type":"text-merge","x":20,"y":506,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_57","name":"line11","type":"text-merge","x":55,"y":399,"width":784,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_58","name":"line12","type":"text-merge","x":55,"y":413,"width":784,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_59","name":"line13","type":"text-merge","x":55,"y":426,"width":784,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_60","name":"line14","type":"text-merge","x":55,"y":439,"width":784,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_61","name":"line15","type":"text-merge","x":55,"y":452,"width":784,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_62","name":"line16","type":"text-merge","x":55,"y":466,"width":784,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_63","name":"line17","type":"text-merge","x":55,"y":479,"width":784,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_64","name":"line18","type":"text-merge","x":55,"y":493,"width":784,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_65","name":"line19","type":"text-merge","x":55,"y":506,"width":784,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_66","name":"price11","type":"text-merge","x":535,"y":399,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_67","name":"price12","type":"text-merge","x":535,"y":413,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_68","name":"price13","type":"text-merge","x":535,"y":426,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_69","name":"price14","type":"text-merge","x":535,"y":439,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_70","name":"price15","type":"text-merge","x":535,"y":452,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_71","name":"price16","type":"text-merge","x":535,"y":466,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_72","name":"price17","type":"text-merge","x":535,"y":479,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_73","name":"price18","type":"text-merge","x":535,"y":493,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_74","name":"price19","type":"text-merge","x":535,"y":506,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_75","name":"tax","type":"text-merge","x":535,"y":615,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_76","name":"rate","type":"text-merge","x":499,"y":615,"width":60,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_77","name":"price","type":"text-merge","x":535,"y":628,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_78","name":"downpayment","type":"text-merge","x":535,"y":642,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_79","name":"balance","type":"text-merge","x":535,"y":669,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_80","name":"qty20","type":"text-merge","x":20,"y":520,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_81","name":"line20","type":"text-merge","x":55,"y":519,"width":784,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_82","name":"price20","type":"text-merge","x":535,"y":520,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_83","name":"qty21","type":"text-merge","x":20,"y":533,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_84","name":"line21","type":"text-merge","x":55,"y":533,"width":784,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_85","name":"price21","type":"text-merge","x":535,"y":533,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_86","name":"qty22","type":"text-merge","x":20,"y":547,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_87","name":"line22","type":"text-merge","x":55,"y":547,"width":784,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_88","name":"price22","type":"text-merge","x":535,"y":547,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_89","name":"qty23","type":"text-merge","x":20,"y":561,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_90","name":"line23","type":"text-merge","x":55,"y":561,"width":784,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_91","name":"price23","type":"text-merge","x":536,"y":561,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_92","name":"qty24","type":"text-merge","x":20,"y":575,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_93","name":"line24","type":"text-merge","x":55,"y":574,"width":784,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_94","name":"price24","type":"text-merge","x":536,"y":574,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_95","name":"qty25","type":"text-merge","x":20,"y":588,"width":40,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_96","name":"line25","type":"text-merge","x":55,"y":588,"width":784,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_97","name":"price25","type":"text-merge","x":536,"y":588,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_98","name":"top","type":"text-merge","x":47,"y":181,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_99","name":"roofStyle","type":"text-merge","x":321,"y":152,"width":100,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef10_100","name":"certified","type":"text-merge","x":497,"y":152,"width":190,"height":16,"required":false,"signer":"sender","page":1}
        ],

        // Generic Door Location Form
        [
            
        ],

        // Generic Roof Waiver
        [
            {"api_id":"ef1cef12_1","name":"customer2","type":"text-merge","x":90,"y":540,"width":220,"height":16,"required":false,"signer":"sender","page":1},{"api_id":"ef1cef12_2","name":"dateSigned","type":"date_signed","x":90,"y":586,"width":220,"height":16,"required":true,"signer":"0","page":1},{"api_id":"ef1cef12_03","name":"Customer","type":"signature","x":90,"y":640,"width":220,"height":16,"required":true,"signer":0,"page":1},
        ],
    ]

}; // end fields

//waivers
var waivers = {

    PSG: [
        [
            'https://carport.com/api/documents/waivers/Generic-Door-Location-Form.pdf',
            'https://carport.com/api/documents/waivers/Generic-Roof-Waiver.pdf',
        ]
    ],

    Elephant: [
        
        [
            'https://carport.com/api/documents/waivers/Generic-Door-Location-Form.pdf',
            'https://carport.com/api/documents/waivers/Generic-Roof-Waiver.pdf',
        ]
        
    ],
    
    Eagle: [
        [
            'https://carport.com/api/documents/waivers/eagle/Eagle-Door-Location-Form.pdf',
            'https://carport.com/api/documents/waivers/Generic-Roof-Waiver.pdf',
        ]
    ],

    EagleFL: [
        [
            'https://carport.com/api/documents/waivers/eagle/Eagle-Door-Location-Form.pdf',
            'https://carport.com/api/documents/waivers/Generic-Roof-Waiver.pdf',
        ]
    ],

    CarolinaCarports: [
        [
            'https://carport.com/api/documents/waivers/Generic-Door-Location-Form.pdf',
            'https://carport.com/api/documents/waivers/Generic-Roof-Waiver.pdf',
        ]
    ],

    SBS: [
        [
            'https://carport.com/api/documents/waivers/Generic-Door-Location-Form.pdf',
            'https://carport.com/api/documents/waivers/Generic-Roof-Waiver.pdf',
        ]
    ],

    Interstate: [
        [
            'https://carport.com/api/documents/waivers/interstate/New-ISS-Order-Form-2019.pdf',
        ]
    ],

    American: [
        [
            'https://carport.com/api/documents/waivers/Generic-Door-Location-Form.pdf',
            'https://carport.com/api/documents/waivers/Generic-Roof-Waiver.pdf',
        ]
    ],

    AmericanCAShop: [
        [
            'https://carport.com/api/documents/waivers/Generic-Door-Location-Form.pdf',
            'https://carport.com/api/documents/waivers/Generic-Roof-Waiver.pdf',
        ]
    ],

    CarportNetwork: [
        [
            'https://carport.com/api/documents/waivers/Generic-Door-Location-Form.pdf',
            'https://carport.com/api/documents/waivers/Generic-Roof-Waiver.pdf',
        ]
    ],
    
    Dreams: [
        [
            'https://carport.com/api/documents/waivers/dreams/Dreams-Carports-Waiver.pdf',
            'https://carport.com/api/documents/waivers/dreams/Terms-and-Conditions_SIGNATURE_2018.pdf',
            'https://carport.com/api/documents/waivers/dreams/Dreams_Roof Waiver-Horizontal-Over-31ft.pdf',
            'https://carport.com/api/documents/waivers/dreams/Build-Over-Waiver.pdf',
        ]
    ],

    WestCoast: [
        [
            'https://carport.com/api/documents/waivers/Generic-Door-Location-Form.pdf',
            'https://carport.com/api/documents/waivers/Generic-Roof-Waiver.pdf',
        ]
    ],


    TriStateCarports: [
        [
            'https://carport.com/api/documents/waivers/Generic-Door-Location-Form.pdf',
            'https://carport.com/api/documents/waivers/Generic-Roof-Waiver.pdf',
        ]
    ],

    QualityCarports: [
        [
            'https://carport.com/api/documents/waivers/Generic-Door-Location-Form.pdf',
            'https://carport.com/api/documents/waivers/Generic-Roof-Waiver.pdf',
        ]
    ],

    Midwest: [
        [
            'https://carport.com/api/documents/waivers/Generic-Door-Location-Form.pdf',
            'https://carport.com/api/documents/waivers/Generic-Roof-Waiver.pdf',
        ]
    ],

    Lonestar: [
        [
            'https://carport.com/api/documents/waivers/Generic-Door-Location-Form.pdf',
            'https://carport.com/api/documents/waivers/Generic-Roof-Waiver.pdf',
        ]
    ],

};

app.use(bodyParser.json());
app.use(cors());

const routes = require("./routes");

router.use('/', routes);

app.post('/api/sign/new/:mfgId', function(req, res) {

    let post = req.body;
    
    var mfgId = req.params.mfgId;
    
    let mfg = manufacturer[mfgId];
    if(post.fields.manOver == 'PSG') {
        mfg = 'PSG';
    }
    let lineItems = [];

    // test mode switch
    let test_mode = 0;
    if(post.fields.testing) {
        test_mode = 1;
    }

    /* debug -- interactive mode
    let manOver = post.fields.manOver;
    console.log('mfgId', mfgId);
    console.log('manOver', manOver);

    console.log('manufacturer', mfg);
    */

    /** documents
    / * For every document you are sending you need an array decsribing the fields. If a document does't
    / * have any fields then you'll have an empty array for that document! 
    / * var documents = [forms.Dreams, waivers.Dreams];
    */
    var documents = [forms[mfg]];

    // initalize fields to add to documents. Always add fields for inital contract fields[mfg][0].
    var fieldsToAdd = [];
    fieldsToAdd.push(fields[mfg][0]);

    // add field values to custom_fields for waivers
    post.fields.customer2 = post.fields.customer;
    post.fields.width2 = post.fields.width;
    post.fields.length2 = post.fields.length;
    post.fields.height2 = post.fields.height;
    
    /* waiver logic per manufacturer */

    if(mfg == 'PSG') {
        // add building options extended form if needed?
        if(post.fields.lineItemCount > 19) {
            documents = [forms[mfg], buildingExtended];
            fieldsToAdd.push(buildingExtendedFields);
        }
        // if we have walk-in doors add “Generic Door Location Form”
        if(post.fields.walkinDoors > 0){
            //documents.push(waivers.PSG[0][0]);
            //fieldsToAdd.push(fields[mfg][1]);
        }
        // if length of roof over 30' and not a vertical roof add “Generic Roof Waiver”
        if(post.fields.length > 30 && !post.fields.roofVert) {
            documents.push(waivers.PSG[0][1]);
            fieldsToAdd.push(fields[mfg][2]);
        }
    }

    if(mfg == 'Elephant') {
        //add building options extended form if needed?
        if(post.fields.lineItemCount > 19) {
            documents = [forms[mfg], buildingExtended];
            fieldsToAdd.push(buildingExtendedFields);
        }
        // if we have walk-in doors add “Generic Door Location Form”
        if(post.fields.walkinDoors > 0) {
            //documents.push(waivers.Elephant[0][0]);
            //fieldsToAdd.push(fields[mfg][1]);

            // add field values to custom_fields for waivers
            //post.fields.customer2 = post.fields.customer;
            //post.fields.width2 = post.fields.width;
            //post.fields.length2 = post.fields.length;
            //post.fields.height2 = post.fields.height;

        }
        // if length of roof over 30' and not a vertical roof add “Generic Roof Waiver”
        if(post.fields.length > 30 && !post.fields.roofVert) {
            documents.push(waivers.Elephant[0][1]);
            fieldsToAdd.push(fields[mfg][2]);
        }
    }
    
    if(mfg == 'Eagle') {
        //add building options extended form if needed?
        if(post.fields.lineItemCount > 19) {
            documents = [forms[mfg], buildingExtended];
            fieldsToAdd.push(buildingExtendedFields);
        }
        // if we have walk-in doors or windows add “Eagle Door Location Form”
        if(post.fields.walkinDoors > 0  || post.fields.windows > 0 ) {
            //documents.push(waivers.Eagle[0][0]);
            //fieldsToAdd.push(fields[mfg][1]);
        }
        // if length of roof over 30' and not a vertical roof add “Generic Roof Waiver”
        if(post.fields.length > 30 && !post.fields.roofVert) {
            documents.push(waivers.Eagle[0][1]);
            fieldsToAdd.push(fields[mfg][2]);
        }

    }

    // todo: waivers for EagleFL. Probablly the same as Eagle?
    if(mfg == 'EagleFL'){
        
    }

    if(mfg == 'CarolinaCarports') {
        //add building options extended form if needed?
        if(post.fields.lineItemCount > 21) {
            documents = [forms[mfg], buildingExtended];
            fieldsToAdd.push(buildingExtendedFieldsCCI);
        }
        // if customer is in FL and has doors then send Generic Door Location Form
        let state = post.fields.state;
        if(!post.fields.copy) {
            state = post.fields.stateInstall;
        }
        
        if(state == 'FL'){
            if(post.fields.walkinDoors > 0) {
                //documents.push(waivers.CarolinaCarports[0][0]);
                //fieldsToAdd.push(fields[mfg][1]);
            }
        }

        // if length of roof over 30' and not a vertical roof add “Generic Roof Waiver”
        if(post.fields.length > 30 && !post.fields.roofVert) {
            documents.push(waivers.CarolinaCarports[0][1]);
            fieldsToAdd.push(fields[mfg][2]);
        }

    }

    if(mfg == 'SBS') {
        // add building options extended form if needed?
        if(post.fields.lineItemCount > 17) {
            documents = [forms[mfg], buildingExtended];
            fieldsToAdd.push(buildingExtendedFieldsSBS);
        }
        // if we have walk-in doors add “Generic Door Location Form”
        if(post.fields.walkinDoors > 0){
            //documents.push(waivers.PSG[0][0]);
            //fieldsToAdd.push(fields[mfg][1]);
        }

        // if length of roof over 30' and not a vertical roof add “Generic Roof Waiver”
        if(post.fields.length > 30 && !post.fields.roofVert) {
            documents.push(waivers.SBS[0][1]);
            fieldsToAdd.push(fields[mfg][2]);
        }

    }

    // todo: waivers for Interstate
    if(mfg == 'Interstate') {
        if(post.fields.lineItemCount > 15) {
            documents = [forms[mfg], buildingExtended];
            fieldsToAdd.push(buildingExtendedFieldsINT);
        }
        // if length of roof over 30' and not a vertical roof add “Generic Roof Waiver”
        if(post.fields.length > 30 && !post.fields.roofVert) {
            documents.push(waivers.Interstate[0][1]);
            fieldsToAdd.push(fields[mfg][2]);
        }
        
    }

    if(mfg == 'American') {
        // if we have walk-in doors add “Generic Door Location Form”
        if(post.fields.walkinDoors > 0){
            //documents.push(waivers.PSG[0][0]);
            //fieldsToAdd.push(fields[mfg][1]);
        }

        // if length of roof over 30' and not a vertical roof add “Generic Roof Waiver”
        if(post.fields.length > 30 && !post.fields.roofVert) {
            documents.push(waivers.American[0][1]);
            fieldsToAdd.push(fields[mfg][2]);
        }

    }

    if(mfg == 'AmericanCAShop') {
        // if we have walk-in doors add “Generic Door Location Form”
        if(post.fields.walkinDoors > 0){
            //documents.push(waivers.PSG[0][0]);
            //fieldsToAdd.push(fields[mfg][1]);
        }

        // if length of roof over 30' and not a vertical roof add “Generic Roof Waiver”
        if(post.fields.length > 30 && !post.fields.roofVert) {
            documents.push(waivers.AmericanCAShop[0][1]);
            fieldsToAdd.push(fields[mfg][2]);
        }

    }

    if(mfg == 'CarportNetwork') {
        // if we have walk-in doors add “Generic Door Location Form”
        if(post.fields.walkinDoors > 0){
            //documents.push(waivers.PSG[0][0]);
            //fieldsToAdd.push(fields[mfg][1]);
        }

        // if length of roof over 30' and not a vertical roof add “Generic Roof Waiver”
        if(post.fields.length > 30 && !post.fields.roofVert) {
            documents.push(waivers.CarportNetwork[0][1]);
            fieldsToAdd.push(fields[mfg][2]);
        }

    }

    if(mfg == 'Dreams') {
        // BY default we always send first and second waiver with every order
        // Note: We can select individual waivers by index
        // Update: Dreams is expecting ALL waivers to be sent
        documents.push(waivers.Dreams[0][0]);
        documents.push(waivers.Dreams[0][1]);
        fieldsToAdd.push(fields[mfg][1]);
        fieldsToAdd.push(fields[mfg][2]);

        // if length of roof over 30' and not a vertical roof add “Generic Roof Waiver”
        if(post.fields.length > 31 && post.fields.roofReg && post.fields.roofAframe) {
            documents.push(waivers.Dreams[0][2]);
            fieldsToAdd.push(fields[mfg][3]);
        }

        // send "Build Over Waiver" if needed?
        // ToDo: Example of leveraging an SPA question for waiver
        //       Remove and send ALL waivers for Deams
        if(post.fields.buildOver) {
            documents.push(waivers.Dreams[0][2]);
            fieldsToAdd.push(fields[mfg][3]);
        }

    }

    if(mfg == 'WestCoast') {
        // if we have walk-in doors add “Generic Door Location Form”
        if(post.fields.walkinDoors > 0){
            //documents.push(waivers.PSG[0][0]);
            //fieldsToAdd.push(fields[mfg][1]);
        }

        // if length of roof over 30' and not a vertical roof add “Generic Roof Waiver”
        if(post.fields.length > 30 && !post.fields.roofVert) {
            documents.push(waivers.WestCoast[0][1]);
            fieldsToAdd.push(fields[mfg][2]);
        }

    }

    if(mfg == 'TriStateCarports') {
        
        documents = [forms[mfg], buildingExtended];
        fieldsToAdd.push(buildingExtendedFields);
        
        // if we have walk-in doors add “Generic Door Location Form”
        if(post.fields.walkinDoors > 0){
            //documents.push(waivers.PSG[0][0]);
            //fieldsToAdd.push(fields[mfg][1]);
        }

        // if length of roof over 30' and not a vertical roof add “Generic Roof Waiver”
        if(post.fields.length > 30 && !post.fields.roofVert) {
            documents.push(waivers.TriStateCarports[0][1]);
            fieldsToAdd.push(fields[mfg][2]);
        }

    }

    if(mfg == 'QualityCarports') {
        // if we have walk-in doors add “Generic Door Location Form”
        if(post.fields.walkinDoors > 0){
            //documents.push(waivers.PSG[0][0]);
            //fieldsToAdd.push(fields[mfg][1]);
        }

        // if length of roof over 30' and not a vertical roof add “Generic Roof Waiver”
        if(post.fields.length > 30 && !post.fields.roofVert) {
            documents.push(waivers.QualityCarports[0][1]);
            fieldsToAdd.push(fields[mfg][2]);
        }

    }

    if(mfg == 'Midwest') {
        // if we have walk-in doors add “Generic Door Location Form”
        if(post.fields.walkinDoors > 0){
            //documents.push(waivers.PSG[0][0]);
            //fieldsToAdd.push(fields[mfg][1]);
        }

        // if length of roof over 30' and not a vertical roof add “Generic Roof Waiver”
        if(post.fields.length > 30 && !post.fields.roofVert) {
            documents.push(waivers.Midwest[0][1]);
            fieldsToAdd.push(fields[mfg][2]);
        }

    }

    if(mfg == 'Lonestar') {
        if(post.fields.lineItemCount > 25) {
            documents = [forms[mfg], buildingExtended];
            fieldsToAdd.push(buildingExtendedFields);
        }
        // if we have walk-in doors add “Generic Door Location Form”
        if(post.fields.walkinDoors > 0){
            //documents.push(waivers.PSG[0][0]);
            //fieldsToAdd.push(fields[mfg][1]);
        }

        // if length of roof over 30' and not a vertical roof add “Generic Roof Waiver”
        if(post.fields.length > 30 && !post.fields.roofVert) {
            documents.push(waivers.Lonestar[0][1]);
            fieldsToAdd.push(fields[mfg][2]);
        }

    }

    // end waiver logic

    /* debug
    console.log('document count', documents.length);
    console.log('fields document count', fieldsToAdd.length);

    console.log('fields document', fieldsToAdd);
    */
    
    // remove passed-in field
    function filterFields(arr, name) {
        let new_array = [];
        for(let i = 0; i < arr.length; i++) {
            let key = arr[i][0];
            let value = arr[i][1];
            if(key !== name) {
                new_array.push([key, value]);
            }
        }
        return new_array;
    }

    // adjust line numbers
    // ToDo: refactor this function to be more robust
    function adjustLineNumbers(arr) {
        let new_array = [];
        for(let i = 0; i < arr.length; i++) {
            let key = arr[i][0];
            if(key.substring(0,4) == 'line') {
                let num = parseInt(key.substring(4), 10) - 1;
                key = 'line' + num;  
            }
            let value = arr[i][1];
            new_array.push([key, value]);
        }
        return new_array;
    }

    // adjust price numbers
    // ToDo: refactor this function to be more robust
    function adjustPriceNumbers(arr) {
        let new_array = [];
        for(let i = 0; i < arr.length; i++) {
            let key = arr[i][0];
            if(key.substring(0,5) == 'price') {
                let num = parseInt(key.substring(5), 10);
                if(num) {
                    num--;
                    key = 'price' + num;
                }
            }
            let value = arr[i][1];
            new_array.push([key, value]);
        }
        return new_array;
    }

    // adjust price numbers
    // ToDo: refactor this function to be more robust
    function adjustQtyNumbers(arr) {
        let new_array = [];
        for(let i = 0; i < arr.length; i++) {
            let key = arr[i][0];
            if(key.substring(0,3) == 'qty') {
                let num = parseInt(key.substring(3), 10);
                if(num) {
                    num--;
                    key = 'qty' + num;
                }
            }
            let value = arr[i][1];
            new_array.push([key, value]);
        }
        return new_array;
    }

    // itemized descriptions for all manufacturers
    // ToDo: break up itemDesc.json by manufacturer and load per manufacturer
    const item_desc = require("./itemDesc.json").descriptions;
    
    // line item descriptions per manufacturer
    let item_desc_mfg = [];
    for(let i = 0; i < item_desc.length; i++) {
        if(item_desc[i]['mfg'] == mfg) {
            item_desc_mfg.push(item_desc[i]['items']);
        }
    }

    // post.fields.sides <--- wall color
    
    /*** custom logic per manufacturer
     * convert fields
    */

    // todo: get install address info from correct fields!
    if (!post.fields.copy) {
        post.fields.customer = post.fields.customerInst;
        post.fields.street = post.fields.streetInst;
        post.fields.city = post.fields.cityInstall;
        post.fields.state = post.fields.stateInstall;
        post.fields.zip = post.fields.zipInst;
        post.fields.phone2 = post.fields.phoneInst;
    }
    //
    
    if (mfg == 'PSG') {
        // do we need to remove groundLevelYes and groundLevelNo?
    }

    if (mfg == 'Elephant') {

        // format values as dollars
        post.fields.basePrice = '$' + post.fields.basePrice;
        post.fields.price = '$' + post.fields.price;
        post.fields.tax = '$' + post.fields.tax;
        post.fields.subtotal = '$' + post.fields.subtotal;
        post.fields.downpayment = '$' + post.fields.downpayment
        post.fields.balance = '$' + post.fields.balance;
        //

    }
   
    if (mfg == 'CarolinaCarports') {
        
        // format values as dollars
        post.fields.price = '$' + post.fields.price;
        post.fields.tax = '$' + post.fields.tax;
        post.fields.subtotal = '$' + post.fields.subtotal;
        post.fields.downpayment = '$' + post.fields.downpayment
        post.fields.total = '$' + post.fields.balance;
        post.fields.balance = '$' + post.fields.balance;
        
        // convert gauge input to checkbox
        if(post.fields.gauge == '12') {
            post.fields.gauge12 = true;
        } else if(post.fields.gauge == '14') {
            post.fields.gauge14 = true;
        }
        delete post.fields.gauge;
        //
    }
    
    if (mfg == 'Eagle') {
        
        // Dealer info
        post.fields.dealerID = 'D0011531-MAIN';
        post.fields.dealerName = 'Elephant Strutcures';
        post.fields.dealerPhone = '855-227-7678';

        post.fields.cardRate = 2.5;
        post.fields.cardBalanceDue = post.fields.balance * 1.025;
        post.fields.cardBalanceDue = post.fields.cardBalanceDue.toFixed(2);

        // format values as dollars
        post.fields.balance = '$' + post.fields.balance;
        post.fields.basePrice = '$' + post.fields.basePrice;
        post.fields.downpayment = '$' + post.fields.downpayment
        post.fields.price = '$' + post.fields.price;
        //post.fields.rate = '$' + post.fields.rate;
        post.fields.subtotal = '$' + post.fields.subtotal;
        post.fields.tax = '$' + post.fields.tax;
        //
        
        // convert gauge input to checkbox
        if(post.fields.gauge == '12') {
            post.fields.gauge12 = true;
        } else if(post.fields.gauge == '14') {
            post.fields.gauge14 = true;
        }
        delete post.fields.gauge;
        //

        // convert roof style checkboxs to input field
        post.fields.roofStyle = 'Regular';
        if(post.fields.roofReg) {
            post.fields.roofStyle = 'Regular';
        } else if(post.fields.roofAframe) {
            post.fields.roofStyle = 'Boxed Eave';
        } else if(post.fields.roofVert) {
            post.fields.roofStyle =='Vertical';
        }

        // convert installation surface checkboxs to input field
        post.fields.installSurface = 'Ground';
        if(post.fields.installCement){
            post.fields.installSurface = 'Cement';
        } else if(post.fields.installAsphalt){
            post.fields.installSurface = 'Asphalt';
        } else if(post.fields.installOther){
            post.fields.installSurface =='Other';
        }
        //

        //
        if(post.fields.certified) {
            post.fields.certified = 'Certified';
        } else {
            post.fields.certified = 'Non Certified';
        }
        //

        // convert buildOver input to checkbox (site ready for install)
        if(post.fields.buildOver) {
            post.fields.buildOverYes = true;
            post.fields.buildOverNo = false;
        } else if(!post.fields.buildOver) {
            post.fields.buildOverYes = false;
            post.fields.buildOverNo = true;
        }
        delete post.fields.buildOver;
        //

        // default building to Carport
        post.fields.building = 'Carport';
    }

    if(mfg == 'SBS') {
        // Dealer info
        post.fields.dealerName = 'Elephant Strutcures';
        post.fields.dealerPhone = '855-227-7678';

        post.fields.buyer = post.fields.customer;

        // roof length
        post.fields.roofLength = post.fields.length + 1;

        // balance + 2.5% Credit Card Fee
        post.fields.cardBalanceDue = post.fields.balance * 1.025;
        post.fields.cardBalanceDue = post.fields.cardBalanceDue.toFixed(2);

        // balance with labor. for now just copy of balance
        post.fields.balanceLabor = post.fields.balance;

    }

    if(mfg == 'Interstate') {

        // Dealer info
        post.fields.dealerName = 'Elephant Strutcures';
        post.fields.dealerPhone = '855-227-7678';

        // convert gauge input to checkbox
        if(post.fields.gauge == '12') {
            post.fields.gauge12 = true;
        } else if(post.fields.gauge == '14') {
            post.fields.gauge14 = true;
        }
        delete post.fields.gauge;

        post.fields.roofSize = post.fields.length;
        post.fields.baseSize = post.fields.length - 1;
        post.fields.legHeight = post.fields.height - 1;

        //
        if(!post.fields.certified) {
            post.fields.uncertified = true;
        }

    }

    if(mfg == 'TriStateCarports') {

        // Dealer info
        post.fields.dealerName = 'Elephant Strutcures';
        post.fields.dealerPhone = '855-227-7678';

        post.fields.paidWidth = true;

    }

    if (mfg == 'Dreams'){
        // do we need to remove groundLevelYes and groundLevelNo?
    }

    if(mfg == 'Lonestar') {
        
        // convert roof style checkboxs to input field
        post.fields.roofStyle = 'Regular';
        if(post.fields.roofReg) {
            post.fields.roofStyle = 'Regular';
        } else if(post.fields.roofAframe) {
            post.fields.roofStyle = 'Boxed Eave';
        } else if(post.fields.roofVert) {
            post.fields.roofStyle =='Vertical';
        }

        if(post.fields.certified) {
            post.fields.certified = 'Certified';
        } else {
            post.fields.certified = 'Non Certified';
        }

        // default building to Carport
        post.fields.building = 'Carport';

    }


    /* end custom convert fields logic */

    // convert post.fields to fields array
    let fieldsArray = Object.entries(post.fields);

    /** custom logic per manufacturer
     * filter fields
    */
    if (mfg == 'CarolinaCarports') {
        // filter out basePrice field
        fieldsArray = filterFields(fieldsArray, 'basePrice');
        // filter out building field
        fieldsArray = filterFields(fieldsArray, 'building');
        // filter out ends field
        fieldsArray = filterFields(fieldsArray, 'ends');
        // ToDo: convert installOther field to text input, but for now filter out!
        fieldsArray = filterFields(fieldsArray, 'installOther');
    }
    if (mfg == 'Eagle') {
        // filter out buyer field
        //fieldsArray = filterFields(fieldsArray, 'buyer');
        // filter out basePrice field
        fieldsArray = filterFields(fieldsArray, 'basePrice');
        // filter out building field
        fieldsArray = filterFields(fieldsArray, 'building');
        // filter out ends field
        fieldsArray = filterFields(fieldsArray, 'ends');
        // filter out rep field
        fieldsArray = filterFields(fieldsArray, 'rep');
        
        // filter out roofReg
        // ToDo: refactor for select box
        fieldsArray = filterFields(fieldsArray, 'roofReg');
        // filter out roofAframe
        // ToDo: refactor for select box
        fieldsArray = filterFields(fieldsArray, 'roofAframe');
        // filter out roofVert
        // ToDo: refactor for select box
        fieldsArray = filterFields(fieldsArray, 'roofVert');
        // filter out installGround
        // ToDo: refactor for text box
        fieldsArray = filterFields(fieldsArray, 'installGround');
        // filter out installCement
        // ToDo: refactor for text box
        fieldsArray = filterFields(fieldsArray, 'installCement');
        // filter out installAsphalt
        // ToDo: refactor for text box
        fieldsArray = filterFields(fieldsArray, 'installAsphalt');
        // filter out installOther
        // ToDo: refactor for text box
        fieldsArray = filterFields(fieldsArray, 'installOther');

    }

    if (mfg == 'SBS') {

    }

    if (mfg == 'Interstate') {
        // filter out buyer field
        fieldsArray = filterFields(fieldsArray, 'buyer');
        // filter out basePrice field
        fieldsArray = filterFields(fieldsArray, 'basePrice');
        // filter out building field
        fieldsArray = filterFields(fieldsArray, 'building');
        // filter out ends field
        fieldsArray = filterFields(fieldsArray, 'ends');

    }
    /* end custom filter logic */

    // don't remove base_regular as line item for these manufacturers
    var remove = true;
    if (mfg == 'Eagle' || mfg == 'CarolinaCarports' || mfg == 'SBS' || mfg == 'Interstate') {
        remove = false;
    }
    if (remove){
        fieldsArray = filterFields(fieldsArray, 'line1');
        fieldsArray = filterFields(fieldsArray, 'price1');
        fieldsArray = filterFields(fieldsArray, 'qty1');
        fieldsArray = adjustLineNumbers(fieldsArray);
        fieldsArray = adjustPriceNumbers(fieldsArray);
        fieldsArray = adjustQtyNumbers(fieldsArray);
    }
    // end remove base_regular

    // get line items
    for(let i = 0; i < fieldsArray.length; i++) {
        let key = fieldsArray[i][0];
        let value = fieldsArray[i][1];
        if(key.substring(0,4) == 'line') {
            lineItems.push([key, value]);
        }
    }

    // debug -- interactive mode
    console.log('line items passed in ---> ', lineItems);
    //

    // get new item descriptions
    let newItemDesc = [];
    let wallStyle = post.fields.wallStyle;
    for(let i = 0; i < lineItems.length; i++) {
        for(let n = 0; n < item_desc_mfg[0].length; n++) {
            let data = item_desc_mfg[0][n];
            if(lineItems[i][1] == data['api_name']) {
                // insert wall color, horizontal
                if(data['api_name'] == 'tlwall' || data['api_name'] == 'trwall') {
                    var color = post.fields.sides;
                    let desc = data['desc'].replace('Wall', 'Wall' + wallStyle + ', ' + color);
                    newItemDesc.push([lineItems[i][0], desc]);
                // insert wall color, vertical
                } /*else if(data['api_name'] == 'tvlside' || data['api_name'] == 'tvrside') {
                    var color = post.fields.sides;
                    let desc = data['desc'].replace('Wall', 'Wall' + wallStyle);
                    newItemDesc.push([lineItems[i][0], desc]);
                }*/ else if(data['api_name'] == 'tesf') { 
                    var color = post.fields.ends;
                    let desc = data['desc'].replace('Wall', 'Wall' + wallStyle + ', ' + color);
                    newItemDesc.push([lineItems[i][0], desc]);
                // insert end front
                } /*else if(data['api_name'] == 'tvfend') {
                    var color = post.fields.ends;
                    let desc = data['desc'].replace('Vertical', color + ' Vertical');
                    newItemDesc.push([lineItems[i][0], desc]);
                } */
                // insert back
                else if(data['api_name'] == 'tesb') {
                    var color = post.fields.ends;
                    let desc = data['desc'].replace('Wall', 'Wall' + wallStyle + ', ' + color);
                    newItemDesc.push([lineItems[i][0], desc]);
                // insert back
                } /*else if(data['api_name'] == 'tvbend') {
                var color = post.fields.ends;
                let desc = data['desc'].replace('Vertical', color + ' Vertical');
                newItemDesc.push([lineItems[i][0], desc]);
                } */
                else {
                newItemDesc.push([lineItems[i][0], data['desc']]);
                }
            }
        }
    }

    // update fields with new descriptions
    for(let i = 0; i < fieldsArray.length; i++) {
        newItemDesc.forEach(function(item, index) {
            if(fieldsArray[i][0] == item[0]) {
                fieldsArray[i][1] = item[1];
            }
        });
    }

    // remap fields here if needed?
        
    //

    // convert fields to object
    let newFields = {};
    for(let i = 0; i < fieldsArray.length; i++) {
        let key = fieldsArray[i][0];
        let value = fieldsArray[i][1];
        newFields[key] = value;
    }
    

    /* testing fields
    res.type('json');
    res.json(newFields);
    */
    
    data = {};
    
    // dynamic
    let opts2 = {
        test_mode: test_mode,
        clientId: 'dad04e2f07e609c35a9ac66fba86444a',
        file_url: documents,
        subject: 'Caport Purchase Agreement',
        message: 'Please sign this agreement to complete your purchase!',
        signers: [
          {
            email_address: post.email,
            name: post.name
          }
        ],
        custom_fields: newFields,
        form_fields_per_document: fieldsToAdd,
    };

    //
    //console.log('sending to HelloSign');
    //console.log(opts2);

    //res.type('json');
    //res.json(opts2);
    //
    
    //
    let sigRequest = {};

    hellosign.signatureRequest.createEmbedded(opts2)
        .then(function(response){
            data = response;
            let signatureId = response.signature_request.signatures[0].signature_id;
            sigRequest = response.signature_request;
            return hellosign.embedded.getSignUrl(signatureId);
        })
        .then(function(response){
            data = response.embedded;
        })
        .catch(function(err){
            data = err;
        })
        .finally(function(){
            res.type('json');
            res.json({...data, sigRequest: sigRequest, version: '1.4'});
        });
    //

});

app.get('/api/sign/get-documents/:signatureId', function(req, res) {
    let sigId = req.params.signatureId;
    res.type('json');
    hellosign.signatureRequest.download(sigId, { file_type: 'pdf', get_url: true }, (err, response) => {
        res.send({sigId,response, err});
    });
});

app.use('/api/sign', router);

app.listen(port, "127.0.0.1", () => console.log(`eSign service running on ${port}`));