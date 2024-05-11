const sampleListings = [
  {
    title: "Ayushman Bharat Yojana",
    coverageDetails: "Government-backed health insurance scheme providing coverage for hospitalization expenses up to ₹5 lakh per family per year for secondary and tertiary care hospitalization.",
    premium: 0, // Premiums are covered by the government for eligible beneficiaries
    deductible: 0, // No deductibles for beneficiaries
    networkProviders: ["Empanelled public and private hospitals across India"],
    enrollmentRequirements: "Available to families identified by the Socio-Economic Caste Census (SECC) database as deprived rural families and identified occupational categories of urban workers' families.",
    additionalInfo: "Cashless treatment available at empanelled hospitals.",
    price: 0, // Premiums are covered by the government
    description: "Ayushman Bharat Yojana aims to provide financial protection to vulnerable families from catastrophic health expenditures.",
  },
  {
    title: "LIC Health Protection Plus",
    coverageDetails: "Health insurance plan offering coverage for hospitalization expenses, pre and post-hospitalization expenses, day care procedures, and domiciliary hospitalization.",
    premium: 5000, // Annual premium amount
    deductible: 2000, // Deductible amount before insurance coverage kicks in
    networkProviders: ["Pan-India network of hospitals"],
    enrollmentRequirements: "Available to individuals aged between 18 to 65 years.",
    additionalInfo: "Cumulative bonus for every claim-free year.",
    price: 6000, // Total yearly cost including premium and deductible
    description: "LIC Health Protection Plus provides comprehensive health coverage with added benefits for policyholders.",
  },
  {
    title: "Apollo Munich Optima Restore",
    coverageDetails: "Health insurance plan offering coverage for hospitalization expenses, daycare procedures, pre and post-hospitalization expenses, and restore benefit that automatically reinstates the basic sum insured if exhausted.",
    premium: 8000, // Annual premium amount
    deductible: 1500, // Deductible amount before insurance coverage kicks in
    networkProviders: ["Apollo Hospitals network and partner hospitals"],
    enrollmentRequirements: "Available to individuals and families.",
    additionalInfo: "Cashless hospitalization and lifetime renewability.",
    price: 9500, // Total yearly cost including premium and deductible
    description: "Apollo Munich Optima Restore ensures comprehensive health coverage with unique benefits to safeguard against medical expenses.",
  },
  {
    title: "Platinum Health Plan",
    coverageDetails: "Comprehensive coverage including hospital stays, prescription drugs, and preventive care.",
    premium: 350,
    deductible: 1000,
    networkProviders: ["Blue Cross", "Cigna", "Aetna"],
    enrollmentRequirements: "Must be a resident of the state and pass a health screening.",
    additionalInfo: "24/7 customer support available.",
    price: 400,
    description: "Our Platinum Health Plan offers top-tier coverage for individuals and families.",
  },
  {
    title: "Gold Health Plan",
    coverageDetails: "Coverage for major medical expenses including surgeries, specialist visits, and emergency care.",
    premium: 250,
    deductible: 1500,
    networkProviders: ["UnitedHealthcare", "Humana", "Kaiser Permanente"],
    enrollmentRequirements: "Must be employed full-time and eligible for group health benefits.",
    additionalInfo: "Discounts available for gym memberships.",
    price: 300,
    description: "Get comprehensive coverage with our Gold Health Plan.",
  },
  {
    title: "Silver Health Plan",
    coverageDetails: "Basic coverage for essential health benefits such as doctor visits, lab tests, and mental health services.",
    premium: 150,
    deductible: 2000,
    networkProviders: ["Aetna", "Humana", "Molina Healthcare"],
    enrollmentRequirements: "No enrollment restrictions.",
    additionalInfo: "Flexible payment options available.",
    price: 200,
    description: "Affordable coverage for essential healthcare needs with our Silver Health Plan.",
  },
    {
      title: "Bronze Health Plan",
      coverageDetails: "Basic coverage for essential health services such as preventive care, vaccinations, and routine check-ups.",
      premium: 100,
      deductible: 3000,
      networkProviders: ["Anthem", "Centene", "WellCare"],
      enrollmentRequirements: "Must be under the age of 30 or qualify for a hardship exemption.",
      additionalInfo: "Includes telemedicine services.",
      price: 150,
      description: "Our Bronze Health Plan offers affordable coverage for young adults and those seeking basic healthcare needs.",
    },
    {
      title: "Catastrophic Health Plan",
      coverageDetails: "Provides coverage for emergencies and serious medical events with high deductibles and lower premiums.",
      premium: 50,
      deductible: 6000,
      networkProviders: ["Ambetter", "Molina Healthcare", "Oscar Health"],
      enrollmentRequirements: "Must be under 30 years old or qualify for a hardship exemption.",
      additionalInfo: "Only available to those who meet specific income requirements.",
      price: 100,
      description: "Our Catastrophic Health Plan is designed for individuals who want coverage for major medical events while keeping premiums low.",
    },
    {
      title: "Family Health Plan",
      coverageDetails: "Comprehensive coverage for entire families, including pediatric care, maternity services, and family counseling.",
      premium: 600,
      deductible: 2000,
      networkProviders: ["Cigna", "UnitedHealthcare", "Blue Cross"],
      enrollmentRequirements: "Must enroll at least one adult and one child under 18.",
      additionalInfo: "Discounts available for adding additional family members.",
      price: 700,
      description: "Secure the health of your entire family with our comprehensive Family Health Plan.",
    },
    {
      title: "Star Health Comprehensive Insurance",
      coverageDetails: "Comprehensive health insurance plan covering hospitalization expenses, pre and post-hospitalization expenses, daycare procedures, and ambulance charges.",
      premium: 6000, // Annual premium amount
      deductible: 2500, // Deductible amount before insurance coverage kicks in
      networkProviders: ["Star Health network hospitals"],
      enrollmentRequirements: "Available to individuals and families with no age limit.",
      additionalInfo: "No sub-limits on room rent or diseases covered.",
      price: 8500, // Total yearly cost including premium and deductible
      description: "Star Health Comprehensive Insurance offers extensive coverage with no hidden sub-limits, ensuring peace of mind during medical emergencies.",
    },
    {
      title: "Max Bupa Health Companion",
      coverageDetails: "Health insurance plan offering coverage for hospitalization expenses, pre and post-hospitalization expenses, day care procedures, and emergency ambulance expenses.",
      premium: 7000, // Annual premium amount
      deductible: 3000, // Deductible amount before insurance coverage kicks in
      networkProviders: ["Max Bupa network hospitals"],
      enrollmentRequirements: "Available to individuals and families.",
      additionalInfo: "Coverage for alternative treatments and annual health check-ups.",
      price: 10000, // Total yearly cost including premium and deductible
      description: "Max Bupa Health Companion provides comprehensive coverage with additional benefits for policyholders' well-being.",
    },
    {
      title: "New India Assurance Mediclaim Policy",
      coverageDetails: "Health insurance policy offering coverage for hospitalization expenses, pre and post-hospitalization expenses, and specified day care procedures.",
      premium: 5500, // Annual premium amount
      deductible: 2000, // Deductible amount before insurance coverage kicks in
      networkProviders: ["Empanelled hospitals across India"],
      enrollmentRequirements: "Available to individuals and families.",
      additionalInfo: "Cumulative bonus for every claim-free year and optional coverage for critical illnesses.",
      price: 7500, // Total yearly cost including premium and deductible
      description: "New India Assurance Mediclaim Policy provides reliable coverage with flexible options to suit policyholders' needs.",
    },
    {
      title: "ICICI Lombard Complete Health Insurance",
      coverageDetails: "Comprehensive health insurance plan covering hospitalization expenses, pre and post-hospitalization expenses, daycare procedures, and health check-ups.",
      premium: 8000, // Annual premium amount
      deductible: 3500, // Deductible amount before insurance coverage kicks in
      networkProviders: ["ICICI Lombard network hospitals"],
      enrollmentRequirements: "Available to individuals and families.",
      additionalInfo: "Coverage for alternative treatments and organ donor expenses.",
      price: 11500, // Total yearly cost including premium and deductible
      description: "ICICI Lombard Complete Health Insurance offers extensive coverage with additional benefits for policyholders' well-being.",
    },
    {
      title: "Reliance HealthWise Plan",
      coverageDetails: "Health insurance plan offering coverage for hospitalization expenses, pre and post-hospitalization expenses, day care procedures, and domiciliary hospitalization.",
      premium: 6500, // Annual premium amount
      deductible: 2800, // Deductible amount before insurance coverage kicks in
      networkProviders: ["Reliance network hospitals"],
      enrollmentRequirements: "Available to individuals and families.",
      additionalInfo: "Loyalty benefits for renewals and coverage for alternative treatments.",
      price: 9300, // Total yearly cost including premium and deductible
      description: "Reliance HealthWise Plan provides comprehensive coverage with loyalty benefits for policyholders.",
    },
    {
      title: "Bajaj Allianz Health Guard Family Floater",
      coverageDetails: "Family floater health insurance plan offering coverage for hospitalization expenses, pre and post-hospitalization expenses, day care procedures, and maternity expenses.",
      premium: 9000, // Annual premium amount
      deductible: 4000, // Deductible amount before insurance coverage kicks in
      networkProviders: ["Bajaj Allianz network hospitals"],
      enrollmentRequirements: "Available to families with children and senior citizens.",
      additionalInfo: "Coverage for maternity expenses and optional critical illness cover.",
      price: 13000, // Total yearly cost including premium and deductible
      description: "Bajaj Allianz Health Guard Family Floater ensures comprehensive coverage for the entire family with additional benefits.",
    },
    // Add more listings as needed
  ];
  module.exports = { data: sampleListings };

