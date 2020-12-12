import axios from '../http/http';

export default {
    async userLogin(loginId, loginPwd) {
        return await axios().post('/api/user/login', {
            loginId,
            loginPwd
        })
    },
    async whoAmI() {
        return await axios().post('/api/user/whoami');
    },
    async updateUser(options) {
        return await axios().put(`/api/user`, options);
    },
    async getUser() {
        return await axios().get('/api/user')
    },
    async getConfig() {
        return await axios().get('/api/config')
    },
    async updateConfig(options) {
        return await axios().put('/api/config', options)
    },
    async getAritcleTypeList() {
        return await axios().get('/api/aritcleType');
    },
    async getAritcleTypeFindByPage(options) {
        return await axios().get('/api/aritcleType/list', {
            params: {
                ...options
            }
        })
    },
    async addAritcleType(options) {
        return await axios().post('/api/aritcleType', options);
    },
    async updateAritcleType(id, options) {
        return await axios().put('/api/aritcleType/' + id, options);
    },
    async deleteAritcleType(id) {
        return await axios().delete('/api/aritcleType/' + id);
    },
    async getOnceEveryDay() {
        return await axios().get('/api/everyDay/once')
    },
    async getEveryDayList(options) {
        return await axios().get('/api/everyDay', {
            params: {
                ...options
            }
        })
    },
    async addEveryDay(options) {
        return await axios().post('/api/everyDay', options);
    },
    async updateEveryDay(id, options) {
        return await axios().put('/api/everyDay/' + id, options);
    },
    async deleteEveryDay(id) {
        return await axios().delete('/api/everyDay/' + id);
    },
    async getAritcleList(options) {
        return await axios().get('/api/aritcle', {
            params: {
                ...options
            }
        })
    },
    async getArticle(id) {
        return await axios().get('/api/aritcle/' + id);
    },
    async addAritcle(options) {
        return await axios().post('/api/aritcle', options);
    },
    async updateAritcle(id, options) {
        return await axios().put('/api/aritcle/' + id, options);
    },
    async deleteAritcle(id) {
        return await axios().delete('/api/aritcle/' + id);
    },
    async getCommentList(options) {
        return await axios().get('/api/comment', {
            params: {
                ...options
            }
        })
    },
    async addComment(options) {
        return await axios().post('/api/comment', options);
    },
    async updateComment(id, options) {
        return await axios().put('/api/comment/' + id, options);
    },
    async deleteComment(id) {
        return await axios().delete('/api/comment/' + id);
    },
    async getLabelList() {
        return await axios().get('/api/label');
    },
    async getLabelFindByPage(options) {
        return await axios().get('/api/label/list', {
            params: {
                ...options
            }
        })
    },
    async addLabel(options) {
        return await axios().post('/api/label', options);
    },
    async updateLabel(id, options) {
        return await axios().put('/api/label/' + id, options);
    },
    async deleteLabel(id) {
        return await axios().delete('/api/label/' + id);
    },
    async getPageList(options) {
        return await axios().get('/api/page', {
            params: {
                ...options
            }
        })
    },
    async getPageById(id) {
        return await axios().get('/api/page/' + id);
    },
    async addPage(options) {
        return await axios().post('/api/page', options);
    },
    async updatePage(id, options) {
        return await axios().put('/api/page/' + id, options);
    },
    async deletePage(id) {
        return await axios().delete('/api/page/' + id);
    },
    async getReply(options) {
        return await axios().get('/api/reply', {
            params: {
                ...options
            }
        })
    },
    async addReply(options) {
        return await axios().post('/api/reply', options);
    },
    async updateReply(id, options) {
        return await axios().put('/api/reply/' + id, options);
    },
    async deleteReply(id) {
        return await axios().delete('/api/reply/' + id);
    },
}