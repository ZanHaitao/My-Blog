import axios from '../http/http';

export default {
    async userLogin(loginId, loginPwd) {
        return await axios.post('/api/user/login', {
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
        return await axios.put('/api/config', options)
    },
    async getFirstPageList() {
        return await axios().get('/api/firstPage');
    },
    async addFirstPage(options) {
        return await axios().post('/api/firstPage', options);
    },
    async updateFirstPageList(id, options) {
        return await axios().put('/api/firstPage/' + id, options);
    },
    async deleteFirstPageList(id) {
        return await axios().delete('/api/firstPage/' + id);
    },
    async getSecondPageList(firstPageId) {
        return await axios().get('/api/secondPage',{
            params:{
                firstPageId
            }
        });
    },
    async addSecondPage(options) {
        return await axios().post('/api/secondPage', options);
    },
    async updateSecondPageList(id, options) {
        return await axios().put('/api/secondPage/' + id, options);
    },
    async deleteSecondPageList(id) {
        return await axios().delete('/api/secondPage/' + id);
    },
    async getAritcleTypeList(){
        return await axios().get('/api/aritcleType');      
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
    async getOnceEveryDay(){
        return await axios().get('/api/everyDay/once')
    },
    async getEveryDayList(){
        return await axios().get('/api/everyDay')
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
    async getAritcleList(options){
        return await axios().get('/api/aritcle',{
            params:{
                ...options
            }
        })
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
    async getCommentList(options){
        return await axios().get('/api/comment',{
            params:{
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
    async getLabelList(){
        return await axios().get('/api/label');
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
}