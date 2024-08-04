import config from './config.json' with { type: "json" };
import express from 'express';
import fetch, { Response } from 'node-fetch';
import formData from 'express-form-data';
import os from 'os';
import { readFile } from 'fs/promises';

import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(config.gemini_key as string);
const gemini = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

const NATURE_SERVE_URL = (str: string) => `https://explorer.natureserve.org/${str}`;
const IUCN_URL = (str: string) => `https://api.iucnredlist.org/api/v4/${str}`;

const app = express();

const options = {
	uploadDir: os.tmpdir(),
	autoClean: true
};

app.use(express.json());

app.use(formData.parse(options));
app.use(formData.format());
app.use(formData.stream());
app.use(formData.union());

app.post('/api/search', async (req, res) => {
    //console.log(req.query);

	const prompt = `Find the closest species that matches the following conditions. Even if it's too vague just give a result. Only output the scientific name of the animal. Never give a result more than three words. Query: ${req.body.text}`;

    let prmpt: string[] | string = prompt;
    if (req.body.image) {

        const imageFile = (await readFile(req.body.image.path)).toString('base64');
        prmpt = [prompt, imageFile]
    }

    const result = await gemini.generateContent(prmpt);
    const parsed = result.response.text().match(/\*(.+?)\*/g)[0]?.replaceAll('*', '');
    
    res.status(200).json({ name: parsed });
});

app.listen(3000, () => {
	console.log('App listening on port 3000');
});

/*
const result = await fetch(NATURE_SERVE_URL('api/data/speciesSearch'), {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            criteriaType: "species",
            textCriteria: [{ paramType: 'quickSearch', searchToken: req.query.query }]
        })
    });

	if (result.ok) {
        const body = await result.json() as Record<string, any>;
        console.log(body);
        if (body.results.length) {
            const { scientificName } = body.results[0];

            const [genus, species] = scientificName.split(" ");

            console.log(IUCN_URL(`taxa/scientific_name?genus_name=${genus.trim()}&species_name=${species.trim()}`));

            const newResult = await fetch(IUCN_URL(`taxa/scientific_name?genus_name=${genus}&species_name=${species}`), {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': config.iucn_key as string
                }
            });

            console.log(await newResult.json());

            if (!newResult.ok) return res.status(404).send('Not Found');

            const { assessment_id } = (await newResult.json() as Record<string, any>).assessments[0];

            const finalResult = await fetch(IUCN_URL(`assessment/${assessment_id}`), {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': process.env.IUCN_KEY as string
                }
            });

            console.log('test 3')

            if (!finalResult.ok) return res.status(404).send('Not Found');

            res.status(200).json(finalResult);

            console.log('test2')
        }
    } else {
        res.status(404).send('Not Found');
    }
*/
