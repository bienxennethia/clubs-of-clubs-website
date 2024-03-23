export const modals = [
  {
    path: "/login",
    content: {
      class: "modal--login",
      title: "LOG IN",
      description: "I. As a MODERATOR, you have access to posting on the forums for the VISITORs to see",
      subtitle: "as MODERATOR",
      fields: [
        {
          label: "CLUB NAME:",
          name: "club",
          placeholderText: "Select the name of the Club officiating below",
          type: "select",
          options: [
            { value: "/", label: "Select club" },
            { value: "corricular", label: "Bedan Chemical Society" },
            { value: "interest", label: "Bedan Society of Young Astronomers" },
            { value: "interest", label: "Math Aficionados" },
            { value: "interest", label: "Red Cross Youth" },
            { value: "interest", label: "Athletico Bedista" },
            { value: "interest", label: "Collective Action Towards Strays" },
            { value: "interest", label: "Digital Arts Society" },
            { value: "interest", label: "Red Lion Radio" }
          ]
        },
        {
          label: "EMAIL:",
          name: "email",
          placeholder: "Personal email only",
          type: "email",
        },
        {
          label: "PASSWORD:",
          name: "password",
          placeholder: "Enter your password",
          type: "password",
        }
      ]
    }
  },
  {
    path: "/clubs",
    content: {
      class: "modal--clubs",
      title: "ADD CLUB",
      description: "Please fill out the form below to add a new club.",
      subtitle: "",
      fields: [
        {
          name: "type",
          type: "select",
          placeholder: "Select type",
          options: [
            { value: "/", label: "Select club" },
            { value: "corricular", label: "Bedan Chemical Society" },
            { value: "interest", label: "Bedan Society of Young Astronomers" },
            { value: "interest", label: "Math Aficionados" },
            { value: "interest", label: "Red Cross Youth" },
            { value: "interest", label: "Athletico Bedista" },
            { value: "interest", label: "Collective Action Towards Strays" },
            { value: "interest", label: "Digital Arts Society" },
            { value: "interest", label: "Red Lion Radio" }
          ]
        },
        {
          name: "name",
          type: "text",
          placeholder: "Name"
        },
        {
          name: "description",
          type: "textarea",
          placeholder: "Description"
        },
        {
          name: "image",
          type: "file",
          placeholder: "Image"
        }
      ]
    }
  },
  {
    path: "/item",
    content: {
      class: "modal--club",
      title: "EDIT CLUB",
      description: "Please fill out the form below to edit club.",
      subtitle: "",
      fields: [
        {
          name: "type",
          type: "select",
          placeholder: "Select type",
          options: [
            { value: "/", label: "Select club" },
            { value: "corricular", label: "Bedan Chemical Society" },
            { value: "interest", label: "Bedan Society of Young Astronomers" },
            { value: "interest", label: "Math Aficionados" },
            { value: "interest", label: "Red Cross Youth" },
            { value: "interest", label: "Athletico Bedista" },
            { value: "interest", label: "Collective Action Towards Strays" },
            { value: "interest", label: "Digital Arts Society" },
            { value: "interest", label: "Red Lion Radio" }
          ]
        },
        {
          name: "name",
          type: "text",
          placeholder: "Name"
        },
        {
          name: "description",
          type: "textarea",
          placeholder: "Description"
        },
        {
          name: "image",
          type: "file",
          placeholder: "Image"
        }
      ]
    }
  },
  {
    path: "/forums",
    content: {
      class: "modal--forum",
      title: "ADD FORUM",
      description: "Please fill out the form below to add a new forum.",
      subtitle: "",
      type: "add-forum",
      fields: [
        {
          name: "type",
          type: "select",
          placeholder: "Select type",
          options: [
            { value: "/", label: "Select club" },
            { value: "corricular", label: "Bedan Chemical Society" },
            { value: "interest", label: "Bedan Society of Young Astronomers" },
            { value: "interest", label: "Math Aficionados" },
            { value: "interest", label: "Red Cross Youth" },
            { value: "interest", label: "Athletico Bedista" },
            { value: "interest", label: "Collective Action Towards Strays" },
            { value: "interest", label: "Digital Arts Society" },
            { value: "interest", label: "Red Lion Radio" }
          ]
        },
        {
          name: "title",
          type: "text",
          placeholder: "Title"
        },
        {
          name: "description",
          type: "textarea",
          placeholder: "Description"
        },
        {
          name: "image",
          type: "file",
          placeholder: "Image"
        }
      ]
    }
  }
];