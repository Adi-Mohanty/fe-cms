export const validateForm = ({ companyName, adminName, phone, email, password }) => {
    const trimmedCompanyName = companyName.trim();
    const trimmedAdminName = adminName.trim();
    const trimmedPhone = phone.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    let formErrors = {};

    // Company Name
    if (!trimmedCompanyName) {
        formErrors.companyName = "Company name is required!";
    } else if (!/^[A-Za-z ]+$/.test(trimmedCompanyName)) {
        formErrors.companyName = "Company name can contain only letters";
    }

    // Admin Name
    if (!trimmedAdminName) {
        formErrors.adminName = "Admin name is required";
    } else if (!/^[A-Za-z ]+$/.test(trimmedAdminName)) {
        formErrors.adminName = "Admin name can contain only letters";
    }

    // Phone
    if (!trimmedPhone) {
        formErrors.phone = "Phone number is required";
    } else if (!/^[0-9]+$/.test(trimmedPhone)) {
        formErrors.phone = "Phone number must contain only digits";
    } else if (trimmedPhone.length !== 10) {
        formErrors.phone = "Phone number must be exactly 10 digits";
    }

    // Email
    if (!trimmedEmail) {
        formErrors.email = "Email is required";
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(trimmedEmail)) {
        formErrors.email = "Please enter a valid email address";
    }

    // Password
    if (!trimmedPassword) {
        formErrors.password = 'Password is required';
    } else if (trimmedPassword.length < 8) {
        formErrors.password = 'Password must be at least 8 characters long';
    } else if (!/[A-Z]/.test(trimmedPassword)) {
        formErrors.password = 'Password must contain at least one uppercase letter';
    } else if (!/[a-z]/.test(trimmedPassword)) {
        formErrors.password = 'Password must contain at least one lowercase letter';
    } else if (!/[0-9]/.test(trimmedPassword)) {
        formErrors.password = 'Password must contain at least one number';
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(trimmedPassword)) {
        formErrors.password = 'Password must include at least one special character';
    }

    return formErrors;
};
