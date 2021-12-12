exports.makeConnectionGraph = (data) => {
    const tunnels = data.split('\n');
    const connections = tunnels.reduce((acc, tunnel) => {
        const [from, to] = tunnel.split('-');

        if (!acc[from]) acc[from] = new Set();
        acc[from].add(to);

        if (!acc[to]) acc[to] = new Set();
        acc[to].add(from);

        return acc;
    }, {});

    return connections;
};
