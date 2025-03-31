
export const STATES =
{
    ENABLED: 'Activado',
    DISABLED: 'Desactivado'
};

export const BENEFICIARY_STATES =
{
    'PRE REGISTRO': 'Pre-registro',
    'NO PUEDE FIRMAR EL ACUERDO': 'No puede firmar el acuerdo',
    'ACUERDO POR FIRMAR': 'Acuerdo por firmar',
    'ACUERDO FIRMADO': 'Acuerdo firmado',
    'EN MONITOREO': 'En monitoreo'
};

export enum Roles {
    //TODO: SOLO TIPO DE VINCULACIÓN UT
    ADMIN = 'ADMIN',
    DIRECCION = 'DIRECCION',
    //TODO: SOLO TIPO DE VINCULACIÓN FUNCIONARIO
    ENLACE_REGIONAL = 'ENLACE_REGIONAL',
    COORDINACION = 'COORDINACION',
    APOYO_A_LA_COORDINACION = 'APOYO_A_LA_COORDINACION',
    PROFESIONAL_EDUCACION = 'PROFESIONAL_EDUCACION',
    PROFESIONAL_CORRESPONSABILIDAD = 'PROFESIONAL_CORRESPONSABILIDAD',
    PROFESIONAL_PSICOSOCIAL = 'PROFESIONAL_PSICOSOCIAL',
    PROFESIONAL_SOCIOJURIDICO = 'PROFESIONAL_SOCIOJURIDICO',
    PROFESIONAL_PREREGISTRO = 'PROFESIONAL_PREREGISTRO',
    GESTORES_SOCIALES = 'GESTORES_SOCIALES',
}

export const RoleHierarchy: any = {
    [Roles.ADMIN]: [Roles.ADMIN],
    [Roles.DIRECCION]: [Roles.DIRECCION],
    [Roles.APOYO_A_LA_COORDINACION]: [Roles.APOYO_A_LA_COORDINACION],
    [Roles.ENLACE_REGIONAL]: [Roles.ENLACE_REGIONAL],
    [Roles.COORDINACION]: [Roles.COORDINACION],
    [Roles.PROFESIONAL_EDUCACION]: [Roles.PROFESIONAL_EDUCACION],
    [Roles.PROFESIONAL_CORRESPONSABILIDAD]: [Roles.PROFESIONAL_CORRESPONSABILIDAD],
    [Roles.PROFESIONAL_PSICOSOCIAL]: [Roles.PROFESIONAL_PSICOSOCIAL],
    [Roles.PROFESIONAL_SOCIOJURIDICO]: [Roles.PROFESIONAL_SOCIOJURIDICO],
    [Roles.PROFESIONAL_PREREGISTRO]: [Roles.PROFESIONAL_PREREGISTRO],
    [Roles.GESTORES_SOCIALES]: [Roles.GESTORES_SOCIALES],
};

export const NAV_ITEMS = [
    {
        name: 'Inicio', route: '/app/home', icon: 'svg/home.svg',
        role: [Roles.ADMIN, Roles.DIRECCION, Roles.ENLACE_REGIONAL, Roles.COORDINACION,
        Roles.PROFESIONAL_PREREGISTRO, Roles.PROFESIONAL_EDUCACION,
        Roles.PROFESIONAL_CORRESPONSABILIDAD, Roles.PROFESIONAL_PSICOSOCIAL,
        Roles.PROFESIONAL_SOCIOJURIDICO, Roles.APOYO_A_LA_COORDINACION, Roles.GESTORES_SOCIALES]
    },
    {
        name: 'Tablero de Control', route: '/app/dashboard', icon: 'svg/dashboard.svg',
        role: [Roles.DIRECCION, Roles.PROFESIONAL_SOCIOJURIDICO, Roles.APOYO_A_LA_COORDINACION,
        Roles.PROFESIONAL_PSICOSOCIAL, Roles.PROFESIONAL_CORRESPONSABILIDAD, Roles.ADMIN,
        Roles.ENLACE_REGIONAL, Roles.COORDINACION, Roles.PROFESIONAL_PREREGISTRO,
        Roles.PROFESIONAL_EDUCACION, Roles.GESTORES_SOCIALES]
    },
    {
        name: 'Actualizar Contraseña', route: '/app/change-my-password', icon: 'svg/key.svg',
        role: [Roles.DIRECCION, Roles.ADMIN, Roles.ENLACE_REGIONAL, Roles.COORDINACION,
        Roles.PROFESIONAL_PREREGISTRO, Roles.PROFESIONAL_EDUCACION,
        Roles.PROFESIONAL_CORRESPONSABILIDAD, Roles.PROFESIONAL_PSICOSOCIAL,
        Roles.PROFESIONAL_SOCIOJURIDICO, Roles.APOYO_A_LA_COORDINACION, Roles.GESTORES_SOCIALES]
    },
    {
        name: 'Parámetros Administrativos', route: null, icon: 'svg/flujo.svg',
        role: [Roles.ADMIN],
        children: [
            {
                name: 'Divipola',
                route: `/app/divipol`,
                icon: 'svg/circle.svg',
                role: ['ADMIN', 'DIRECCION']
            },
            {
                name: 'Puntos',
                route: `/app/point-index`,
                icon: 'svg/circle.svg',
                role: ['ADMIN', 'DIRECCION']
            },
            {
                name: 'Componentes',
                route: `/app/component`,
                icon: 'svg/circle.svg',
                role: ['ADMIN', 'DIRECCION']
            },
            {
                name: 'Programación de Horario',
                route: `/app/date-group`,
                icon: 'svg/circle.svg',
                role: ['ADMIN', 'DIRECCION']
            },
            {
                name: 'Usuarios',
                route: `/app/user`,
                icon: 'svg/circle.svg',
                role: 'ADMIN'
            },
            {
                name: 'Preguntas Encuestas',
                route: `/app/question-group`,
                icon: 'svg/circle.svg',
                role: ['ADMIN', 'DIRECCION']
            },
            {
                name: 'Bancos',
                route: '/app/bank',
                icon: 'svg/circle.svg',
                role: ['ADMIN', 'DIRECCION']
            },
            {
                name: 'Días Hábiles',
                route: '/app/calendar-working-days',
                icon: 'svg/circle.svg',
                role: ['ADMIN', 'DIRECCION']
            },
            {
                name: 'Grupos',
                route: `/app/group`,
                icon: 'svg/circle.svg',
                role: 'ADMIN'
            },{
                name: 'Asistencias Generadas',
                route: `/app/assistance-generates`,
                icon: 'svg/circle.svg',
                role: 'ADMIN'
            },
        ]
    },
    {
        name: 'Parámetros Administrativos', route: null, icon: 'svg/flujo.svg',
        role: [Roles.DIRECCION],
        children: [
            {
                name: 'Divipola',
                route: `/app/divipol`,
                icon: 'svg/circle.svg',
                role: ['ADMIN', 'DIRECCION']
            },
            {
                name: 'Puntos',
                route: `/app/point-index`,
                icon: 'svg/circle.svg',
                role: ['ADMIN', 'DIRECCION']
            },
            {
                name: 'Componentes',
                route: `/app/component`,
                icon: 'svg/circle.svg',
                role: ['ADMIN', 'DIRECCION']
            },
            {
                name: 'Programación de Horario',
                route: `/app/date-group`,
                icon: 'svg/circle.svg',
                role: ['ADMIN', 'DIRECCION']
            },
            {
                name: 'Preguntas Encuestas',
                route: `/app/question-group`,
                icon: 'svg/circle.svg',
                role: ['ADMIN', 'DIRECCION']
            },
            {
                name: 'Bancos',
                route: '/app/bank',
                icon: 'svg/circle.svg',
                role: ['ADMIN', 'DIRECCION']
            },
            {
                name: 'Días Hábiles',
                route: '/app/calendar-working-days',
                icon: 'svg/circle.svg',
                role: ['ADMIN', 'DIRECCION']
            },
            {
                name: 'Grupos',
                route: `/app/group`,
                icon: 'svg/circle.svg',
                role: 'ADMIN'
            },
        ]
    },
    {
        name: 'Encuesta Prerregistro', route: '/app/preregister', icon: 'svg/encuestas.svg',
        role: [Roles.DIRECCION, Roles.ADMIN, Roles.GESTORES_SOCIALES, Roles.APOYO_A_LA_COORDINACION, Roles.PROFESIONAL_EDUCACION, Roles.COORDINACION, Roles.PROFESIONAL_CORRESPONSABILIDAD, Roles.PROFESIONAL_PSICOSOCIAL, Roles.PROFESIONAL_SOCIOJURIDICO, Roles.PROFESIONAL_PREREGISTRO, Roles.ENLACE_REGIONAL]
    },
    {
        name: 'Prerregistros Extemporáneos', route: '/app/extemporary-survey', icon: 'svg/book.svg',
        role: [Roles.DIRECCION, Roles.ADMIN]
    },
    {
        name: 'Administración Dirección', route: null, icon: 'svg/register.svg',
        role: [Roles.ADMIN, Roles.DIRECCION],
        children: [
            {
                name: 'RNEC',
                route: `/app/beneficiary-no-validate`,
                icon: 'svg/circle.svg',
                role: 'DIRECCION'
            },
            {
                name: 'DNP',
                route: `/app/dnp`,
                icon: 'svg/circle.svg',
                role: 'DIRECCION'
            },
            {
                name: 'DPS',
                route: `/app/dps`,
                icon: 'svg/circle.svg',
                role: 'DIRECCION'
            },
            {
                name: 'ARN',
                route: `/app/arn`,
                icon: 'svg/circle.svg',
                role: 'DIRECCION'
            },
            {
                name: 'Docs No Validados',
                route: `/app/document-validate`,
                icon: 'svg/circle.svg',
                role: 'DIRECCION'
            },
            {
                name: 'Certificación Bancaria No Validada',
                route: `/app/bank-certification-no-validate`,
                icon: 'svg/circle.svg',
                role: 'DIRECCION'
            },
            {
                name: 'Jóvenes Validados RNEC',
                route: `/app/rnec-validated`,
                icon: 'svg/circle.svg',
                role: 'DIRECCION'
            },
            {
                name: 'Acuerdos Corresponsabilidad',
                route: `/app/coresponsability-agreement`,
                icon: 'svg/circle.svg',
                role: 'DIRECCION'
            },
            {
                name: 'Jóvenes Aprobados sin Firmar Acuerdo',
                route: `/app/professional-team-beneficiary-accepted`,
                icon: 'svg/circle.svg',
                role: 'DIRECCION'
            },
            {
                name: 'Jóvenes Sin Grupo',
                route: `/app/beneficiary-without-group`,
                icon: 'svg/circle.svg',
                role: 'DIRECCION'
            },
            {
                name: 'Certificaciones Bancaria',
                route: `/app/account-certification`,
                icon: 'svg/circle.svg',
                role: 'DIRECCION'
            },
            {
                name: 'Asistencia Educación < 70%',
                route: `/app/attendance-less-percent`,
                icon: 'svg/circle.svg',
                role: 'DIRECCION'
            },
            {
                name: 'Asistencia Corresponsabilidad < 70%',
                route: `/app/attendance-less-percent-corresponsability`,
                icon: 'svg/circle.svg',
                role: 'DIRECCION'
            },
            {
                name: 'TMC',
                route: `/app/tmc`,
                icon: 'svg/circle.svg',
                role: 'DIRECCION'
            },
            {
                name: 'Administrar Regiones',
                route: `/app/region`,
                icon: 'svg/circle.svg',
                role: 'DIRECCION'
            },
            {
                name: 'Administración de Jóvenes',
                route: '/app/survey',
                icon: 'svg/circle.svg',
                role: 'DIRECCION'
            },
            {
                name: 'Documentación de Jóvenes',
                route: '/app/survey-documents',
                icon: 'svg/circle.svg',
                role: 'DIRECCION'
            },
            {
                name: 'Grupos',
                route: `/app/group`,
                icon: 'svg/circle.svg',
                role: 'DIRECCION'
            },
        ]
    },
    {
        name: 'Jovenes', route: null, icon: 'svg/beneficiary.svg',
        role: [Roles.ENLACE_REGIONAL, Roles.COORDINACION],
        children: [
            {
                name: 'Todos Los Jóvenes',
                route: `/app/professional-team-beneficiary`,
                icon: 'svg/circle.svg',
                role: [Roles.ENLACE_REGIONAL, Roles.COORDINACION, Roles.PROFESIONAL_PSICOSOCIAL]
            },
            {
                name: 'Jóvenes no Validados',
                route: '/app/beneficiary-no-validate-professional',
                icon: 'svg/circle.svg',
                role: [Roles.ENLACE_REGIONAL, Roles.COORDINACION]
            },
            {
                name: 'Jóvenes Aprobados sin Firmar Acuerdo',
                route: `/app/professional-team-beneficiary-accepted`,
                icon: 'svg/circle.svg',
                role: [Roles.ENLACE_REGIONAL, Roles.COORDINACION]
            },
            {
                name: 'Acuerdo firmado sin Certificación Bancaria',
                route: `/app/banking-certification-rejected`,
                icon: 'svg/circle.svg',
                role: [Roles.ENLACE_REGIONAL, Roles.COORDINACION]
            },
            {
                name: 'Jóvenes Sin Grupo',
                route: `/app/my-regional-beneficiary-without-group`,
                icon: 'svg/circle.svg',
                role: [Roles.ENLACE_REGIONAL, Roles.COORDINACION]
            },
            {
                name: 'Jóvenes Sin Validar Por ARN',
                route: `/app/professional-team-beneficiary-arn-pending`,
                icon: 'svg/circle.svg',
                role: [Roles.ENLACE_REGIONAL, Roles.COORDINACION]
            },
            {
                name: 'Jóvenes Sin Validar Por DPS',
                route: `/app/professional-team-beneficiary-dps-pending`,
                icon: 'svg/circle.svg',
                role: [Roles.ENLACE_REGIONAL, Roles.COORDINACION]
            },
            {
                name: 'Jóvenes Sin Validar Por DNP',
                route: `/app/professional-team-beneficiary-dnp-pending`,
                icon: 'svg/circle.svg',
                role: [Roles.ENLACE_REGIONAL, Roles.COORDINACION]
            },
            {
                name: 'Jóvenes No Validados por DNP',
                route: `/app/professional-team-beneficiary-dnp-rejected`,
                icon: 'svg/circle.svg',
                role: [Roles.ENLACE_REGIONAL, Roles.COORDINACION]
            },
            {
                name: 'Jóvenes No Validados por ARN',
                route: `/app/professional-team-beneficiary-arn-rejected`,
                icon: 'svg/circle.svg',
                role: [Roles.ENLACE_REGIONAL, Roles.COORDINACION]
            },
            {
                name: 'Jóvenes No Validados por DPS',
                route: `/app/beneficiary-rejected-DPS`,
                icon: 'svg/circle.svg',
                role: [Roles.ENLACE_REGIONAL, Roles.COORDINACION]
            },
        ]
    },

    {
        name: 'Mis Grupos', route: '/app/my-group', icon: 'svg/group.svg',
        role: [Roles.ENLACE_REGIONAL, Roles.COORDINACION, Roles.PROFESIONAL_EDUCACION, Roles.PROFESIONAL_CORRESPONSABILIDAD, Roles.PROFESIONAL_PSICOSOCIAL, Roles.PROFESIONAL_SOCIOJURIDICO, Roles.GESTORES_SOCIALES]
    },

    {
        name: 'Caracterización y Monitoreo', route: '/app/beneficiary-by-psicosocial', icon: 'svg/file.svg',
        role: [Roles.PROFESIONAL_PSICOSOCIAL]
    },
    {
        name: 'Validación Documental', route: '/app/document-validate-coordinator', icon: 'svg/document.svg',
        role: [Roles.APOYO_A_LA_COORDINACION]
    },
    {
        name: 'Firmar Acuerdos', route: '/app/agreement-signature', icon: 'svg/signature.svg',
        role: [Roles.APOYO_A_LA_COORDINACION, Roles.PROFESIONAL_EDUCACION, Roles.PROFESIONAL_CORRESPONSABILIDAD, 
            Roles.PROFESIONAL_PSICOSOCIAL, Roles.PROFESIONAL_SOCIOJURIDICO, Roles.GESTORES_SOCIALES]
    },

];