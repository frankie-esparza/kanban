const joinByComma = (arr) => arr ? arr.join(', ') : null;
const joinByAnd = (arr) => arr ? arr.join(' AND ') : null;

const getVars = (obj) => obj ? Object.keys(obj).map((key, i) => '$' + `${i + 1}`) : null;

const getKeyValuePairs = (obj) => {
    if (!obj) return null;
    const vars = getVars(obj);
    const keys = Object.keys(obj);
    return keys.map((key, i) => `${key} = ${vars[i]}`)
}

// ----------------------------------------
// EXPORTS
// ----------------------------------------
const getValues = (obj) => obj ? Object.values(obj) : null;

const getVarsJoinedByCommas = (obj) => joinByComma(getVars(obj));
const getKeysJoinedByCommas = (obj) => joinByComma(Object.keys(obj));

const getKeyValuePairsJoinedByCommas = (obj) => joinByComma((getKeyValuePairs(obj)));
const getKeyValuePairsJoinedByAnds = (obj) => joinByAnd(getKeyValuePairs(obj));

// ----------------------------------------
// WRAPPER FOR ALL ROUTES
// ----------------------------------------
const queryWrapper = (queryFunc) => {
    return async (req, res) => {
        try {
            const tableName = req.params.tableName || null;
            const id = req.params.id || null;
            const queries = req.query || null;
            const body = req.body || null;
            let result = await queryFunc(tableName, id, queries, body);
            (result.command === 'DELETE') ? res.json('Item was successfully deleted') : res.json(result.rows);
        } catch (err) {
            console.error(err.message);
        }
    }
}

module.exports = {
    getValues,
    getVarsJoinedByCommas,
    getKeysJoinedByCommas,
    getKeyValuePairsJoinedByCommas,
    getKeyValuePairsJoinedByAnds,
    queryWrapper
}
