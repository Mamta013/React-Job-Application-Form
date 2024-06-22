import React, { useState } from 'react';

const JobApplicationForm = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        position: '',
        relevantExperience: '',
        portfolioUrl: '',
        managementExperience: '',
        additionalSkills: {
            JavaScript: false,
            CSS: false,
            Python: false,
        },
        preferredInterviewTime: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setFormData((prevData) => ({
                ...prevData,
                additionalSkills: {
                    ...prevData.additionalSkills,
                    [name]: checked,
                },
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const validate = () => {
        const errors = {};
        if (!formData.fullName) errors.fullName = 'Full Name is required';
        if (!formData.email) errors.email = 'Email is required';
        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid';
        if (!formData.phoneNumber) errors.phoneNumber = 'Phone Number is required';
        if (formData.phoneNumber && isNaN(formData.phoneNumber)) errors.phoneNumber = 'Phone Number is invalid';
        if ((formData.position === 'Developer' || formData.position === 'Designer') && (!formData.relevantExperience || formData.relevantExperience <= 0)) {
            errors.relevantExperience = 'Relevant Experience must be greater than 0';
        }
        if (formData.position === 'Designer' && (!formData.portfolioUrl || !/^https?:\/\/.+\..+$/.test(formData.portfolioUrl))) {
            errors.portfolioUrl = 'Portfolio URL is invalid';
        }
        if (formData.position === 'Manager' && !formData.managementExperience) {
            errors.managementExperience = 'Management Experience is required';
        }
        if (!Object.values(formData.additionalSkills).some((skill) => skill)) {
            errors.additionalSkills = 'At least one skill must be selected';
        }
        if (!formData.preferredInterviewTime) {
            errors.preferredInterviewTime = 'Preferred Interview Time is required';
        } else if (new Date(formData.preferredInterviewTime) <= new Date()) {
            errors.preferredInterviewTime = 'Preferred Interview Time must be in the future';
        }
        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            const selectedSkills = Object.keys(formData.additionalSkills).filter(skill => formData.additionalSkills[skill]);
            const formDataToDisplay = {
                ...formData,
                additionalSkills: selectedSkills.join(', '),
                relevantExperience: (formData.position === 'Developer' || formData.position === 'Designer') ? formData.relevantExperience : undefined,
                portfolioUrl: formData.position === 'Designer' ? formData.portfolioUrl : undefined,
                managementExperience: formData.position === 'Manager' ? formData.managementExperience : undefined,
            };
            alert(JSON.stringify(formDataToDisplay, null, 2));
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Full Name:</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
                {errors.fullName && <p>{errors.fullName}</p>}
            </div>
            <div>
                <label>Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} />
                {errors.email && <p>{errors.email}</p>}
            </div>
            <div>
                <label>Phone Number:</label>
                <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
                {errors.phoneNumber && <p>{errors.phoneNumber}</p>}
            </div>
            <div>
                <label>Applying for Position:</label>
                <select name="position" value={formData.position} onChange={handleChange}>
                    <option value="">Select</option>
                    <option value="Developer">Developer</option>
                    <option value="Designer">Designer</option>
                    <option value="Manager">Manager</option>
                </select>
                {errors.position && <p>{errors.position}</p>}
            </div>
            {(formData.position === 'Developer' || formData.position === 'Designer') && (
                <div>
                    <label>Relevant Experience (years):</label>
                    <input type="number" name="relevantExperience" value={formData.relevantExperience} onChange={handleChange} />
                    {errors.relevantExperience && <p>{errors.relevantExperience}</p>}
                </div>
            )}
            {formData.position === 'Designer' && (
                <div>
                    <label>Portfolio URL:</label>
                    <input type="text" name="portfolioUrl" value={formData.portfolioUrl} onChange={handleChange} />
                    {errors.portfolioUrl && <p>{errors.portfolioUrl}</p>}
                </div>
            )}
            {formData.position === 'Manager' && (
                <div>
                    <label>Management Experience:</label>
                    <input type="text" name="managementExperience" value={formData.managementExperience} onChange={handleChange} />
                    {errors.managementExperience && <p>{errors.managementExperience}</p>}
                </div>
            )}
            <div>
                <label>Additional Skills:</label>
                <div className="checkbox-group">
                    <label>
                        <input type="checkbox" name="JavaScript" checked={formData.additionalSkills.JavaScript} onChange={handleChange} />
                        JavaScript
                    </label>
                    <label>
                        <input type="checkbox" name="CSS" checked={formData.additionalSkills.CSS} onChange={handleChange} />
                        CSS
                    </label>
                    <label>
                        <input type="checkbox" name="Python" checked={formData.additionalSkills.Python} onChange={handleChange} />
                        Python
                    </label>
                
                </div>
                {errors.additionalSkills && <p>{errors.additionalSkills}</p>}
            </div>
            <div>
                <label>Preferred Interview Time:</label>
                <input type="datetime-local" name="preferredInterviewTime" value={formData.preferredInterviewTime} onChange={handleChange} />
                {errors.preferredInterviewTime && <p>{errors.preferredInterviewTime}</p>}
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default JobApplicationForm;
