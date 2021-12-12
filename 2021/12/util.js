exports.makeConnectionGraph = (data) => {
    const tunnels = data.split('\n');
    const connections = tunnels.reduce((acc, tunnel) => {
        const [from, to] = tunnel.split('-');

        if (!acc[from]) acc[from] = [to];
        else acc[from].push(to);

        if (!acc[to]) acc[to] = [from];
        else acc[to].push(from);

        return acc;
    }, {});

    return connections;
};
