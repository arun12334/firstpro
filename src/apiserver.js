import { api, cancelToken } from "./js/api.js";

let getFileListCancelToken = null;
export function getfilelist(params, success, error) {
  if (getFileListCancelToken) {
    console.log("api, cancelled");
    getFileListCancelToken.cancel();
  }
  getFileListCancelToken = cancelToken();
  api
    .get(`/api/file/allFileList${params}`, {
      cancelToken: getFileListCancelToken.token
    })
    .then((res) => {
      if (res.status === 200) {
        success(res.data);
      } else {
        error(res.data);
      }
    }).catch(function (err) {
      error(err.response.data || {});
    });
  return getFileListCancelToken;
}
export function getfiles(params, success, error) {
  api.get(`/api/sourcing/allsrcFileList${params}`)
    .then((res) => {
      if (res.status === 200) {
        success(res.data);
      } else {
        error(res.data);
      }
    }).catch((err) => {
      error(err)
    })
}

let getFileCancelToken = null;
export function getFile(params, success, error) {

  if (getFileCancelToken) {
    // console.log("api, cancelled");
    getFileCancelToken.cancel();
  }
  getFileCancelToken = cancelToken();
  api
    .get(`/singleFile/${params}`, {
      cancelToken: getFileCancelToken.token
      // onDownloadProgress: (progressEvent) => {
      //   let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      //   console.log(progressEvent.lengthComputable)
      //   console.log(percentCompleted);
      // }
    })
    .then((res) => {
      if (res.status === 200) {
        success(res.data);
      } else {
        error(res.data);
      }
    }).catch(function (err) {
      error(err.response.data || {});
      console.log(err.response.data);
    });
  return getFileCancelToken;
}

export function getFileByAttribute(params, success, error) {

  if (getFileCancelToken) {
    // console.log("api, cancelled");
    getFileCancelToken.cancel();
  }
  getFileCancelToken = cancelToken();
  api
    .get(`/singleFileByAttribute/${params}`, {
      cancelToken: getFileCancelToken.token
      // onDownloadProgress: (progressEvent) => {
      //   let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      //   console.log(progressEvent.lengthComputable)
      //   console.log(percentCompleted);
      // }
    })
    .then((res) => {
      if (res.status === 200) {
        success(res.data);
      } else {
        error(res.data);
      }
    }).catch(function (err) {
      error(err.response.data || {});
      console.log(err.response.data);
    });
  return getFileCancelToken;
}


export function saveExcel(params, success, error) {
  api
    .post(`/saveExcel`, params)
    .then((res) => {
      if (res.status === 200) {
        success(res.data);
      } else {
        error(res.data);
      }
    }).catch(function (err) {
      error(err.response.data || {});
      console.log(err.response.data);
    });
}
export function uploadFile(params, success, error) {
  api.post(`/api/sourcing/uploadfile`, params, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
    .then((res) => {
      if (res.status === 200) {
        success(res.data);
      } else {
        error(res.data);
      }
    }).catch((err) => {
      error(err)
    })
}

export function filedatalist(params, success, error) {
  api.post(`/api/sourcing/filedatalist`, {
    headers: {
      'fileid': params
    },
  })
    .then((res) => {
      if (res.status === 200) {
        success(res.data);
      } else {
        error(res.data);
      }
    }).catch((err) => {
      error(err)
    })
}

export function uploadExcel(params, success, error, progressFn) {
  api
    .post(`/uploadExcel`, params, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: data => {
        //Set the progress value to show the progress bar
        const progress = Math.round((100 * data.loaded) / data.total);
        console.log("progress", progress);
        progressFn(progress);
      },
    })
    .then((res) => {
      if (res.status === 200) {
        success(res.data);
      } else {
        error(res.data);
      }
    }).catch(function (err) {
      error(err.response.data || {});
      console.log(err.response.data)
    });
}

export function processList(success, error) {
  api.get("/api/sourcing/processlist")
    .then((res) => {
      if (res.status === 200) {
        success(res.data);
      } else {
        error(res.data);
      }
    }).catch((err) => {
      error(err)
    })
}

export function fieldlist(params, success, error) {
  api.get(`/api/sourcing/fieldlist?process=${params}`)
    .then((res) => {
      if (res.status === 200) {
        success(res.data);
      } else {
        error(res.data);
      }
    }).catch((err) => {
      error(err)
    })
}

let getUploadCancelToken = null;
export function exportExcel(params, success, error) {

  if (getUploadCancelToken) {
    // console.log("api, cancelled");
    getUploadCancelToken.cancel();
  }
  getUploadCancelToken = cancelToken();
  api
    .get(`/downloadExcel/${params}`, {
      cancelToken: getUploadCancelToken.token
      // onDownloadProgress: (progressEvent) => {
      //   let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      //   console.log(progressEvent.lengthComputable)
      //   console.log(percentCompleted);
      // }
    })
    .then((res) => {
      if (res.status === 200) {
        success(res.data);
      } else {
        error(res.data);
      }
    }).catch(function (err) {
      error(err.response.data || {});
      console.log(err.response.data);
    });
  return getUploadCancelToken;
}

export function login(params, success, error) {
  api
    .post(`/api/user/login`, params)
    .then((res) => {
      if (res.status === 200) {
        success(res.data);
      } else {
        error(res.data);
      }
    }).catch(function (err) {
      error(err || {});
    });
}

export function assignfilewise(params, success, error) {
  api
    .post(`/api/sourcing/assignfilewise`, params)
    .then((res) => {
      if (res.status === 200) {
        success(res.data);
      } else {
        error(res.data);
      }
    }).catch(function (err) {
      error(err || {});
    });
}

export function assignfieldwise(params, success, error) {
  api
    .post(`/api/sourcing/assignfieldwise`, params)
    .then((res) => {
      if (res.status === 200) {
        success(res.data);
      } else {
        error(res.data);
      }
    }).catch(function (err) {
      error(err || {});
    });
}


export function fileCount(success, error) {
  api.get('/api/sourcing/countfile')
    .then((res) => {
      if (res.status === 200) {
        success(res.data)
      } else {
        error(res.data)
      }
    }).catch((err) => {
      error(err)
    })
}
export function allsrcFileList(params, success, error) {
  api.get(`/api/sourcing/allsrcFileList?userType=${params.userType}&userId=${params.userId}`)
    .then((res) => {
      if (res.status === 200) {
        // console.log('ss', res)
        success(res.data)
      } else {
        error(res.data)
      }
    }).catch((err) => {
      error(err)
    })
}

export function listcolumnsearch(params, success, error) {
  api.get(`/api/sourcing/listcolumnsearch?fileid=${params}`)
    .then((res) => {
      if (res.status === 200) {
        success(res.data)
      } else {
        error(res.data)
      }
    }).catch((err) => {
      error(err)
    })
}

export function listProjectMaster(success, error) {
  api.get(`/api/master/listProjectMaster`)
    .then((res) => {
      if (res.status === 200) {
        success(res.data)
      } else {
        error(res.data)
      }
    }).catch((err) => {
      error(err)
    })
}

export function userType(success, error) {
  api.get(`/api/master/userType`)
    .then((res) => {
      if (res.status === 200) {
        success(res.data)
      } else {
        error(res.data)
      }
    }).catch((err) => {
      error(err)
    })
}

export function PTuserList(success, error) {
  api.get(`/api/user/PTuserList`)
    .then((res) => {
      if (res.status === 200) {
        success(res.data)
      } else {
        error(res.data)
      }
    }).catch((err) => {
      error(err)
    })
}


export function listfieldpopulate(params, success, error) {
  api.get(`/api/sourcing/listfieldpopulate?fileid=${params}`)
    .then((res) => {
      if (res.status === 200) {
        success(res.data)
      } else {
        error(res.data)
      }
    }).catch((err) => {
      error(err)
    })
}

export function listfieldwise(params, success, error) {
  api.get(`/api/sourcing/listfieldwise?fileid=${params.fileId}&field=${params.field}`)
    .then((res) => {
      if (res.status === 200) {
        success(res.data)
      } else {
        error(res.data)
      }
    }).catch((err) => {
      error(err)
    })
}

export function projectList(success, error) {
  api.get('/api/sourcing/projectlist')
    .then((res) => {
      if (res.status === 200) {
        success(res.data)
      } else {
        error(res.data)
      }
    }).catch((err) => {
      error(err)
    })
}

export function listprocessMaster(success, error) {
  api.get('/api/master/listprocessMaster')
    .then((res) => {
      if (res.status === 200) {
        success(res.data)
      } else {
        error(res.data)
      }
    }).catch((err) => {
      error(err)
    })
}

export function listFieldsMaster(success, error) {
  api.get('/api/master/listFieldsMaster')
    .then((res) => {
      if (res.status === 200) {
        success(res.data)
      } else {
        error(res.data)
      }
    }).catch((err) => {
      error(err)
    })
}

export function listUserMaster(success, error) {
  api.get('/api/master/listUserMaster')
    .then((res) => {
      if (res.status === 200) {
        success(res.data)
      } else {
        error(res.data)
      }
    }).catch((err) => {
      error(err)
    })
}

export function nodeList(params, success, error) {

  if (getFileCancelToken) {
    // console.log("api, cancelled");
    getFileCancelToken.cancel();
  }
  getFileCancelToken = cancelToken();
  api
    .get(`/nodeList/${params}`, {
      cancelToken: getFileCancelToken.token
      // onDownloadProgress: (progressEvent) => {
      //   let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      //   console.log(progressEvent.lengthComputable)
      //   console.log(percentCompleted);
      // }
    })
    .then((res) => {
      if (res.status === 200) {
        success(res.data);
      } else {
        error(res.data);
      }
    }).catch(function (err) {
      error(err.response.data || {});
      console.log(err.response.data);
    });
  return getFileCancelToken;
}

export function attributesByFile(params, success, error) {

  if (getFileCancelToken) {
    // console.log("api, cancelled");
    getFileCancelToken.cancel();
  }
  getFileCancelToken = cancelToken();
  api
    .get(`/attributeByFile/${params}`, {
      cancelToken: getFileCancelToken.token
      // onDownloadProgress: (progressEvent) => {
      //   let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      //   console.log(progressEvent.lengthComputable)
      //   console.log(percentCompleted);
      // }
    })
    .then((res) => {
      if (res.status === 200) {
        success(res.data);
      } else {
        error(res.data);
      }
    }).catch(function (err) {
      console.log(err);
      error(err);
    });
  return getFileCancelToken;
}

let getUserListCancelToken = null;
export function userList(success, error) {

  if (getUserListCancelToken) {
    // console.log("api, cancelled");
    getUserListCancelToken.cancel();
  }
  getUserListCancelToken = cancelToken();
  api
    .get(`/userList`, {
      cancelToken: getFileCancelToken.token
      // onDownloadProgress: (progressEvent) => {
      //   let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      //   console.log(progressEvent.lengthComputable)
      //   console.log(percentCompleted);
      // }
    })
    .then((res) => {
      if (res.status === 200) {
        success(res.data);
      } else {
        error(res.data);
      }
    }).catch(function (err) {
      error(err.response.data || {});
      console.log(err.response.data);
    });
  return getFileCancelToken;
}

export function assignedUser(params, success, error) {
  api
    .post(`/assignedUser`, params)
    .then((res) => {
      if (res.status === 200) {
        success(res.data);
      } else {
        error(res.data);
      }
    }).catch(function (err) {
      error(err.response.data || {});
      console.log(err.response.data);
    });
}
export function projectMaster(params, success, error) {
  api
    .post(`api/master/projectMaster`, params)
    .then((res) => {
      if (res.status === 200) {
        success(res.data);
      } else {
        error(res.data);
      }
    }).catch(function (err) {
      error(err.response.data || {});
      console.log(err.response.data);
    });
}
export function userMaster(params, success, error) {
  api
    .post(`api/master/userMaster`, params)
    .then((res) => {
      if (res.status === 200) {
        success(res.data);
      } else {
        error(res.data);
      }
    }).catch(function (err) {
      error(err.response.data || {});
      console.log(err.response.data);
    });
}

export function fieldsMaster(params, success, error) {
  api
    .post(`api/master/fieldsMaster`, params)
    .then((res) => {
      if (res.status === 200) {
        success(res.data);
      } else {
        error(res.data);
      }
    }).catch(function (err) {
      error(err.response.data || {});
      console.log(err.response.data);
    });
}

export function processMaster(params, success, error) {
  api
    .post(`api/master/processMaster`, params)
    .then((res) => {
      if (res.status === 200) {
        success(res.data);
      } else {
        error(res.data);
      }
    }).catch(function (err) {
      error(err.response.data || {});
      console.log(err.response.data);
    });
}



let getAssignedCancelToken = null;
export function assignedAttributeByFile(params, success, error) {

  if (getAssignedCancelToken) {
    // console.log("api, cancelled");
    getAssignedCancelToken.cancel();
  }
  getAssignedCancelToken = cancelToken();
  api
    .get(`/assignedAttributeByFile/${params}`, {
      cancelToken: getAssignedCancelToken.token
      // onDownloadProgress: (progressEvent) => {
      //   let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      //   console.log(progressEvent.lengthComputable)
      //   console.log(percentCompleted);
      // }
    })
    .then((res) => {
      if (res.status === 200) {
        success(res.data);
      } else {
        error(res.data);
      }
    }).catch(function (err) {
      console.log(err);
      error(err);
    });
  return getAssignedCancelToken;
}

let getSingleAssignedCancelToken = null;
export function singleFileByAttribute(params, success, error) {

  if (getSingleAssignedCancelToken) {
    // console.log("api, cancelled");
    getSingleAssignedCancelToken.cancel();
  }
  getSingleAssignedCancelToken = cancelToken();
  api
    .get(`/singleFileByAttribute/${params}`, {
      cancelToken: getAssignedCancelToken.token
      // onDownloadProgress: (progressEvent) => {
      //   let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      //   console.log(progressEvent.lengthComputable)
      //   console.log(percentCompleted);
      // }
    })
    .then((res) => {
      if (res.status === 200) {
        success(res.data);
      } else {
        error(res.data);
      }
    }).catch(function (err) {
      console.log(err);
      error(err);
    });
  return getAssignedCancelToken;
}

export function addCheckList(params, success, error) {
  api
    .post(`/addCheckList`, params)
    .then((res) => {
      if (res.status === 200) {
        success(res.data);
      } else {
        error(res.data);
      }
    }).catch(function (err) {
      error(err.response.data || {});
      console.log(err.response.data);
    });
}

export function updateCheckList(params, success, error) {
  api
    .patch(`/editCheckList`, params)
    .then((res) => {
      if (res.status === 200) {
        success(res.data);
      } else {
        error(res.data);
      }
    }).catch(function (err) {
      error(err.response.data || {});
      console.log(err.response.data);
    });
}

let getAllChecklistCancelToken = null;
export function allCheckList(params, success, error) {

  if (getAllChecklistCancelToken) {
    // console.log("api, cancelled");
    getAllChecklistCancelToken.cancel();
  }
  getAllChecklistCancelToken = cancelToken();
  api
    .get(`/allCheckList/${params}`, {
      cancelToken: getAllChecklistCancelToken.token
      // onDownloadProgress: (progressEvent) => {
      //   let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      //   console.log(progressEvent.lengthComputable)
      //   console.log(percentCompleted);
      // }
    })
    .then((res) => {
      if (res.status === 200) {
        success(res.data);
      } else {
        error(res.data);
      }
    }).catch(function (err) {
      error(err.response.data || {});
      console.log(err.response.data);
    });
  return getFileCancelToken;
}

let getChecklistTypeCancelToken = null;
export function checkListByType(params, success, error) {

  if (getChecklistTypeCancelToken) {
    // console.log("api, cancelled");
    getChecklistTypeCancelToken.cancel();
  }
  getChecklistTypeCancelToken = cancelToken();
  api
    .get(`/checkListByType/${params}`, {
      cancelToken: getChecklistTypeCancelToken.token
      // onDownloadProgress: (progressEvent) => {
      //   let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      //   console.log(progressEvent.lengthComputable)
      //   console.log(percentCompleted);
      // }
    })
    .then((res) => {
      if (res.status === 200) {
        success(res.data);
      } else {
        error(res.data);
      }
    }).catch(function (err) {
      error(err.response.data || {});
      console.log(err.response.data);
    });
  return getChecklistTypeCancelToken;
}

export function saveCheckListStatus(params, success, error) {
  api
    .post(`/saveCheckListStatus`, params)
    .then((res) => {
      if (res.status === 200) {
        success(res.data);
      } else {
        error(res.data);
      }
    }).catch(function (err) {
      error(err.response.data || {});
      console.log(err.response.data);
    });
}

let allCheckListFilecanceltoken = null;
export function allCheckListFile(success, error) {

  if (allCheckListFilecanceltoken) {
    // console.log("api, cancelled");
    allCheckListFilecanceltoken.cancel();
  }
  allCheckListFilecanceltoken = cancelToken();
  api
    .get(`/allCheckListFile/`, {
      cancelToken: allCheckListFilecanceltoken.token
      // onDownloadProgress: (progressEvent) => {
      //   let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      //   console.log(progressEvent.lengthComputable)
      //   console.log(percentCompleted);
      // }
    })
    .then((res) => {
      if (res.status === 200) {
        success(res.data);
      } else {
        error(res.data);
      }
    }).catch(function (err) {
      error(err.response.data || {});
      console.log(err.response.data);
    });
  return allCheckListFilecanceltoken;
}

let token1 = null;
export function checkListHistoryByfile(params, success, error) {

  if (token1) {
    // console.log("api, cancelled");
    token1.cancel();
  }
  token1 = cancelToken();
  api
    .get(`/checkListHistoryByfile/${params}`, {
      cancelToken: token1.token
      // onDownloadProgress: (progressEvent) => {
      //   let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      //   console.log(progressEvent.lengthComputable)
      //   console.log(percentCompleted);
      // }
    })
    .then((res) => {
      if (res.status === 200) {
        success(res.data);
      } else {
        error(res.data);
      }
    }).catch(function (err) {
      error(err.response.data || {});
      console.log(err.response.data);
    });
  return token1;
}

let updateattributestatuscanceltoken = null;
export function updateAttributeStatus(params, success, error) {

  if (updateattributestatuscanceltoken) {
    // console.log("api, cancelled");
    updateattributestatuscanceltoken.cancel();
  }
  updateattributestatuscanceltoken = cancelToken();
  api
    .patch(`/updateAttributeStatus/${params}`, {
      cancelToken: updateattributestatuscanceltoken.token
      // onDownloadProgress: (progressEvent) => {
      //   let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      //   console.log(progressEvent.lengthComputable)
      //   console.log(percentCompleted);
      // }
    })
    .then((res) => {
      if (res.status === 200) {
        success(res.data);
      } else {
        error(res.data);
      }
    }).catch(function (err) {
      error(err.response.data || {});
      console.log(err.response.data);
    });
  return updateattributestatuscanceltoken;
}

export function assignedAllAttribute(params, success, error) {
  api
    .post(`/assignedAllAttribute`, params)
    .then((res) => {
      if (res.status === 200) {
        success(res.data);
      } else {
        error(res.data);
      }
    }).catch(function (err) {
      error(err.response.data || {});
      console.log(err.response.data);
    });
}

export function ResetPassword(params, success, error) {
  api
    .patch(`/resetPassword`, params)
    .then((res) => {
      if (res.status === 200) {
        success(res.data);
      } else {
        error(res.data);
      }
    }).catch(function (err) {
      error(err.response.data || {});
      console.log(err.response.data);
    });
}

let getauditUserListCancelToken = null;
export function auditUserList(success, error) {

  if (getauditUserListCancelToken) {
    // console.log("api, cancelled");
    getauditUserListCancelToken.cancel();
  }
  getauditUserListCancelToken = cancelToken();
  api
    .get(`/auditUserList`, {
      cancelToken: getFileCancelToken.token
      // onDownloadProgress: (progressEvent) => {
      //   let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      //   console.log(progressEvent.lengthComputable)
      //   console.log(percentCompleted);
      // }
    })
    .then((res) => {
      if (res.status === 200) {
        success(res.data);
      } else {
        error(res.data);
      }
    }).catch(function (err) {
      error(err.response.data || {});
      console.log(err.response.data);
    });
  return getFileCancelToken;
}

let getassignedAssignedCancelToken = null;
export function assignedAttributeForAudit(params, success, error) {

  if (getassignedAssignedCancelToken) {
    // console.log("api, cancelled");
    getassignedAssignedCancelToken.cancel();
  }
  getassignedAssignedCancelToken = cancelToken();
  api
    .get(`/assignedAttributeForAudit/${params}`, {
      cancelToken: getassignedAssignedCancelToken.token
      // onDownloadProgress: (progressEvent) => {
      //   let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      //   console.log(progressEvent.lengthComputable)
      //   console.log(percentCompleted);
      // }
    })
    .then((res) => {
      if (res.status === 200) {
        success(res.data);
      } else {
        error(res.data);
      }
    }).catch(function (err) {
      console.log(err);
      error(err);
    });
  return getassignedAssignedCancelToken;
}

let getauditFileListCancelToken = null;
export function getauditFileList(params, success, error) {
  if (getauditFileListCancelToken) {
    console.log("api, cancelled");
    getauditFileListCancelToken.cancel();
  }
  getauditFileListCancelToken = cancelToken();
  api
    .get(`/auditFileList${params}`, {
      cancelToken: getauditFileListCancelToken.token
    })
    .then((res) => {
      if (res.status === 200) {
        success(res.data);
      } else {
        error(res.data);
      }
    }).catch(function (err) {
      error(err.response.data || {});
    });
  return getauditFileListCancelToken;
}



let getattributeListForAuditCancelToken = null;
export function AttributeListForAudit(params, success, error) {

  if (getattributeListForAuditCancelToken) {
    // console.log("api, cancelled");
    getattributeListForAuditCancelToken.cancel();
  }
  getattributeListForAuditCancelToken = cancelToken();
  api
    .get(`/attributeListForAudit/${params}`, {
      cancelToken: getattributeListForAuditCancelToken.token
      // onDownloadProgress: (progressEvent) => {
      //   let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      //   console.log(progressEvent.lengthComputable)
      //   console.log(percentCompleted);
      // }
    })
    .then((res) => {
      if (res.status === 200) {
        success(res.data);
      } else {
        error(res.data);
      }
    }).catch(function (err) {
      console.log(err);
      error(err);
    });
  return getattributeListForAuditCancelToken;
}

export function assignedAuditUser(params, success, error) {
  api
    .post(`/assignedAuditUser`, params)
    .then((res) => {
      if (res.status === 200) {
        success(res.data);
      } else {
        error(res.data);
      }
    }).catch(function (err) {
      error(err.response.data || {});
      console.log(err.response.data);
    });
}

let getSingleFileDetailsForAuditCancelToken = null;
export function singleFileDetailsForAudit(params, success, error) {

  if (getSingleFileDetailsForAuditCancelToken) {
    // console.log("api, cancelled");
    getSingleFileDetailsForAuditCancelToken.cancel();
  }
  getSingleFileDetailsForAuditCancelToken = cancelToken();
  api
    .get(`/singleFileDetailsForAudit/${params}`, {
      cancelToken: getSingleFileDetailsForAuditCancelToken.token
      // onDownloadProgress: (progressEvent) => {
      //   let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      //   console.log(progressEvent.lengthComputable)
      //   console.log(percentCompleted);
      // }
    })
    .then((res) => {
      if (res.status === 200) {
        success(res.data);
      } else {
        error(res.data);
      }
    }).catch(function (err) {
      error(err.response.data || {});
      console.log(err.response.data);
    });
  return getSingleFileDetailsForAuditCancelToken;
}

export function saveExcelForAudit(params, success, error) {
  api
    .post(`/saveExcelForAudit`, params)
    .then((res) => {
      if (res.status === 200) {
        success(res.data);
      } else {
        error(res.data);
      }
    }).catch(function (err) {
      error(err.response.data || {});
      console.log(err.response.data);
    });
}

let updateAttributeStatusByQAcanceltoken = null;
export function updateAttributeStatusByQA(params, success, error) {

  if (updateAttributeStatusByQAcanceltoken) {
    // console.log("api, cancelled");
    updateAttributeStatusByQAcanceltoken.cancel();
  }
  updateAttributeStatusByQAcanceltoken = cancelToken();
  api
    .patch(`/updateAttributeStatusByQA`, params)
    .then((res) => {
      if (res.status === 200) {
        success(res.data);
      } else {
        error(res.data);
      }
    }).catch(function (err) {
      error(err.response.data || {});
      console.log(err.response.data);
    });
  return updateAttributeStatusByQAcanceltoken;
}

let getAttributeDetailsCancelToken = null;
export function AttributeDetails(params, success, error) {

  if (getAttributeDetailsCancelToken) {
    // console.log("api, cancelled");
    getAttributeDetailsCancelToken.cancel();
  }
  getAttributeDetailsCancelToken = cancelToken();
  api
    .get(`/AttributeDetails/${params}`, {
      cancelToken: getAttributeDetailsCancelToken.token
      // onDownloadProgress: (progressEvent) => {
      //   let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      //   console.log(progressEvent.lengthComputable)
      //   console.log(percentCompleted);
      // }
    })
    .then((res) => {
      if (res.status === 200) {
        success(res.data);
      } else {
        error(res.data);
      }
    }).catch(function (err) {
      console.log(err);
      error(err);
    });
  return getAttributeDetailsCancelToken;
}


let updateattributestatus1canceltoken = null;
export function ReworkCompleted(params, success, error) {

  if (updateattributestatus1canceltoken) {
    // console.log("api, cancelled");
    updateattributestatus1canceltoken.cancel();
  }
  updateattributestatus1canceltoken = cancelToken();
  api
    .patch(`/ReworkCompleted`, params)
    .then((res) => {
      if (res.status === 200) {
        success(res.data);
      } else {
        error(res.data);
      }
    }).catch(function (err) {
      error(err.response.data || {});
      console.log(err.response.data);
    });
  return updateattributestatus1canceltoken;
}

let updateattributestatus2canceltoken = null;
export function ReadyToDelivered(params, success, error) {

  if (updateattributestatus2canceltoken) {
    // console.log("api, cancelled");
    updateattributestatus2canceltoken.cancel();
  }
  updateattributestatus2canceltoken = cancelToken();
  api
    .patch(`/ReadyToDelivered`, params)
    .then((res) => {
      if (res.status === 200) {
        success(res.data);
      } else {
        error(res.data);
      }
    }).catch(function (err) {
      error(err.response.data || {});
      console.log(err.response.data);
    });
  return updateattributestatus2canceltoken;
}