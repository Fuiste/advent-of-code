exports.getOctopusMap = (data) => {
    const rows = data.split('\n');

    return rows.map((r) => r.split('').map((it) => parseInt(it, 10)));
};
