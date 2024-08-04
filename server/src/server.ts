import config from './config.json' with { type: "json" };
import express from 'express';
import fetch, { Response } from 'node-fetch';
import formData from 'express-form-data';
import os from 'os';
import fs from 'fs';

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
app.use(express.urlencoded());

app.use(formData.parse(options));
app.use(formData.format());
app.use(formData.stream());
app.use(formData.union());

app.post('/api/search', async (req, res) => {
	const prompt = `Provide a list of many species that matches the description provided in the following input text, image, or both. Only output Amphibians, Reptiles, or Mammals. Only output Scientific name, do not include localised name or any other text. Ensure the animals are found in Canada. The user may provide further details about its location:\n\n${req.body.text?.length ? req.body.text : ''}`;

    const { path } = req.body.image;
    const ext = path?.split(' ')?.slice(-1)[0] ?? null;

    const arr: any[] = [prompt];

    if (ext) {
        const image = {
            inlineData: {
                data: Buffer.from(fs.readFileSync(path)).toString('base64'),
                mimeType: `image/${ext}`
            }
        };

        arr.push(image);
    }

    const result = await gemini.generateContent(arr);
    console.log(result.response.text());

	/* const result = await fetch(NATURE_SERVE_URL('api/data/speciesSearch'), {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            criteriaType: "species",
            textCriteria: query
        })
    }) */

	/* if (result.ok) {
        const body = await result.json() as Record<string, any>;
        if (body.results.length) {
            const { scientificName } = body.results[0];

            const [genus, species] = scientificName.split(" ");

            const newResult = await fetch(IUCN_URL(`taxa/scientific_name?genus_name=${genus}&species_name=${species}`), {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': config.icun_key as string
                }
            });

            if (!newResult.ok) return res.status(404).send('Not Found');

            const { assessment_id } = (await newResult.json() as Record<string, any>).assessments[0];

            const finalResult = await fetch(IUCN_URL(`assessment/${assessment_id}`), {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': process.env.IUCN_KEY as string
                }
            });

            if (!finalResult.ok) return res.status(404).send('Not Found');

            res.status(200).json(finalResult);
        }
    } else {
        res.status(404).send('Not Found');
    } */
});

app.listen(3000, () => {
	console.log('App listening on port 3000');
});
