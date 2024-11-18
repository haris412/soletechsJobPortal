export class CVReaderData {
    status: string = '';
    message: string = '';
    confidenceScore: ConfidenceScore = new ConfidenceScore();
    data: Data = new Data();
}

export class ConfidenceScore {
    value: number = 0.0;
    threshold: number = 0.0;
}

export class Data {
    extractedData: ExtractedData = new ExtractedData();
    recommendations: string[] = [];
}

export class ExtractedData {
    name: string = '';
    email: string = '';
    phone: string = '';
    yearsOfExperience: number = 0;
    address: string = '';
    experience: string = '';
    skills: string[] = [];
    educations: string[] = [];
    certifications: string[] = [];
    languagesKnown: string[] = [];
    references: string[] = [];
}