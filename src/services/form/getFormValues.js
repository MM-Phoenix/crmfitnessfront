export default function getFormValues(inputRefs) {
    const formValues = {};

    for (let ref in inputRefs) {
        if (ref.endsWith('Section')) {
            const value = inputRefs[ref].checkFunction();

            if (value) {
                formValues[inputRefs[ref].getInputName()] = value;
            } else {
                return undefined;
            }
        }
    }
    return formValues;
}
