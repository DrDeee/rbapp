import { LocalGroup } from '@/src/LocalGroup';
import { Representative } from '@/src/Representative';

interface IndexState {
  localGroups: Array<LocalGroup> | null,
  buddies: Array<any> | null,
}
export const state = (): IndexState => ({
  localGroups: null,
  buddies: null,
})

export const mutations = {
  setGroups(state: IndexState, groups: Array<LocalGroup>) {
    state.localGroups = groups.sort((a, b) => a.name.localeCompare(b.name));
  },
  setBuddies(state: IndexState, buddies: Array<any>) {
    state.buddies = buddies.sort((a, b) => a.name.localeCompare(b.name));
  },
  addBuddy(state: IndexState, buddy: any) {
    state.buddies?.push(buddy);
  },
  removeBuddy(state: IndexState, buddyId: string) {
    let index = state.buddies?.findIndex((b) => b.id === buddyId);
    if (index) {
      state.buddies?.splice(index, 1);
    }
  },
  setBuddy(state: IndexState, { group, buddy }: any) {
    let localGroup = state.localGroups?.find((g) => g.id === group);
    if (localGroup) {
      localGroup.buddy = buddy;
    }
  },
  setRepStatus(state: IndexState, { group, rep, status }: any) {
    let localGroup = state.localGroups?.find((g) => g.id === group);
    let representative = localGroup?.allRepresentatives.find((r) => r.id == rep);
    if (representative) {
      representative.status = status;
    }
  },
  setRepData(state: IndexState, { group, rep, data }: any) {
    let localGroup = state.localGroups?.find((g) => g.id === group);
    let representative = localGroup?.allRepresentatives.find((r) => r.id == rep);
    if (representative) {
      representative.phone = data.phone;
      representative.name = data.name;
    }
  },
  removeRep(state: IndexState, { group, rep }: any) {
    let localGroup = state.localGroups?.find((g) => g.id === group);
    localGroup?.allRepresentatives.splice(
      localGroup?.allRepresentatives.findIndex((r) => r.id === rep),
      1);
  },
  newRep(state: IndexState, {group, rep}: any) {
    let localGroup = state.localGroups?.find((g) => g.id === group);
    localGroup?.allRepresentatives.push(rep);
  },
  newLocalGroup(state: IndexState, newLocalGroup: any) {
    state.localGroups?.push(newLocalGroup);
  },
  setPoll(state: IndexState, { poll, group }: any) {
    let localGroup = state.localGroups?.find((g) => g.id === group)
    if(localGroup) {
      localGroup.poll = poll;
    }
  },
  newBuddy(state: IndexState, buddy: any) {
    state.buddies?.push(buddy);
  }
} 

export const actions: any = {
  async setBuddy({ commit }: any, { group, buddy } :any) {
    if (buddy === "") {
      buddy = null;
    }
    if (buddy) {
      await this.$axios.put(`localGroups/${group}/buddy/${buddy}`);
    } else {
      await this.$axios.delete(`localGroups/${group}/buddy/`);
    }
    commit("setBuddy", { group, buddy });
  },
  async newRep({ commit }: any, { group, rep }: any) {
    rep = new Representative(
      await this.$axios.$post(`localGroups/${group}/representatives`, {
        status: 'CURRENT',
        ...rep,
      }),
    );
    commit("newRep", { group, rep });
  },
  async setRepStatus({ state, commit }: any, { group, rep, status }: any) {
    let representative = state.localGroups.find((r: any) => r.id === rep);
    await this.$axios.put(
      `/localGroups/${group}/representatives/${rep}`,
      {
        ...representative,
        status
      }
    );
    commit("setRepStatus", { group, rep, status });
  },
  async setRepData({ commit }: any, { group, rep, data }: any) {
    await this.$axios.patch(
      `/representatives/${rep}`,
      data
    );
    commit("setRepData", { group, rep, data });
  },
  async removeRep({ commit }: any, { group, rep }: any) {
    await this.$axios.delete(`/localGroups/${group}/representatives/${rep}`)
    commit("removeRep", { group, rep });
  },
  async getGroups({ commit }: any) {
    return this.$axios.$get('localGroups').then((data: any) => {
      commit(
        'setGroups', data.map(
          (localGroup: any) => new LocalGroup(localGroup)
        )
      )
    });
  },

  async newLocalGroup({ commit }: any, newLocalGroup: any) {
    const newGroup = await this.$axios.$post('localGroups', newLocalGroup);
    commit('newLocalGroup', new LocalGroup(newGroup));
  },
  submitPoll({ commit }: any, { poll, group }: any) {
    this
      .$axios
      .$put(`localGroups/${group}/poll`, poll)
      .then(() => commit("setPoll", { poll, group }));
  },
  async getBuddies({ commit }: any) {
    return this
      .$axios
      .$get('buddies')
      .then((buddies: any) => commit('setBuddies', buddies))
  }, 
  async newBuddy({ commit }: any, buddy: any) {
    return this
      .$axios
      .$post('buddies', buddy)
      .then((newBuddy: any) => commit('addBuddy', newBuddy))
  },
  async deleteBuddy({ commit }: any, buddyId: string) {
    return this
      .$axios
      .$delete(`buddies/${buddyId}`)
      .then(() => commit('removeBuddy', buddyId))
  },
}
