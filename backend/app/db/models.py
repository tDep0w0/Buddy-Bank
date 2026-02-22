from typing import Optional
import datetime
import enum
import uuid

from sqlalchemy import (
    BigInteger,
    Boolean,
    CheckConstraint,
    Column,
    Computed,
    DateTime,
    Double,
    Enum,
    ForeignKeyConstraint,
    Index,
    Numeric,
    PrimaryKeyConstraint,
    SmallInteger,
    String,
    Table,
    Text,
    UniqueConstraint,
    Uuid,
    text,
)
from sqlalchemy.dialects.postgresql import JSONB, OID
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship


class Base(DeclarativeBase):
    pass


class ExpenseCategory(str, enum.Enum):
    GENERAL = "general"
    FD = "fd"
    TRANSPORT = "transport"
    SHOPPING = "shopping"
    ENTERTAINMENT = "entertainment"


class Users(Base):
    __tablename__ = "users"
    __table_args__ = (
        CheckConstraint(
            "email_change_confirm_status >= 0 AND email_change_confirm_status <= 2",
            name="users_email_change_confirm_status_check",
        ),
        PrimaryKeyConstraint("id", name="users_pkey"),
        UniqueConstraint("phone", name="users_phone_key"),
        Index(
            "confirmation_token_idx",
            "confirmation_token",
            postgresql_include=[],
            postgresql_where="((confirmation_token)::text !~ '^[0-9 ]*$'::text)",
            unique=True,
        ),
        Index(
            "email_change_token_current_idx",
            "email_change_token_current",
            postgresql_include=[],
            postgresql_where="((email_change_token_current)::text !~ '^[0-9 ]*$'::text)",
            unique=True,
        ),
        Index(
            "email_change_token_new_idx",
            "email_change_token_new",
            postgresql_include=[],
            postgresql_where="((email_change_token_new)::text !~ '^[0-9 ]*$'::text)",
            unique=True,
        ),
        Index(
            "reauthentication_token_idx",
            "reauthentication_token",
            postgresql_include=[],
            postgresql_where="((reauthentication_token)::text !~ '^[0-9 ]*$'::text)",
            unique=True,
        ),
        Index(
            "recovery_token_idx",
            "recovery_token",
            postgresql_include=[],
            postgresql_where="((recovery_token)::text !~ '^[0-9 ]*$'::text)",
            unique=True,
        ),
        Index(
            "users_email_partial_key",
            "email",
            postgresql_include=[],
            postgresql_where="(is_sso_user = false)",
            unique=True,
        ),
        Index("users_instance_id_email_idx", "instance_id", postgresql_include=[]),
        Index("users_instance_id_idx", "instance_id", postgresql_include=[]),
        Index("users_is_anonymous_idx", "is_anonymous", postgresql_include=[]),
        {
            "comment": "Auth: Stores user login data within a secure schema.",
            "schema": "auth",
        },
    )

    id: Mapped[uuid.UUID] = mapped_column(Uuid, primary_key=True)
    is_sso_user: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        server_default=text("false"),
        comment="Auth: Set this column to true when the account comes from SSO. These accounts can have duplicate emails.",
    )
    is_anonymous: Mapped[bool] = mapped_column(
        Boolean, nullable=False, server_default=text("false")
    )
    instance_id: Mapped[Optional[uuid.UUID]] = mapped_column(Uuid)
    aud: Mapped[Optional[str]] = mapped_column(String(255))
    role: Mapped[Optional[str]] = mapped_column(String(255))
    email: Mapped[Optional[str]] = mapped_column(String(255))
    encrypted_password: Mapped[Optional[str]] = mapped_column(String(255))
    email_confirmed_at: Mapped[Optional[datetime.datetime]] = mapped_column(
        DateTime(True)
    )
    invited_at: Mapped[Optional[datetime.datetime]] = mapped_column(DateTime(True))
    confirmation_token: Mapped[Optional[str]] = mapped_column(String(255))
    confirmation_sent_at: Mapped[Optional[datetime.datetime]] = mapped_column(
        DateTime(True)
    )
    recovery_token: Mapped[Optional[str]] = mapped_column(String(255))
    recovery_sent_at: Mapped[Optional[datetime.datetime]] = mapped_column(
        DateTime(True)
    )
    email_change_token_new: Mapped[Optional[str]] = mapped_column(String(255))
    email_change: Mapped[Optional[str]] = mapped_column(String(255))
    email_change_sent_at: Mapped[Optional[datetime.datetime]] = mapped_column(
        DateTime(True)
    )
    last_sign_in_at: Mapped[Optional[datetime.datetime]] = mapped_column(DateTime(True))
    raw_app_meta_data: Mapped[Optional[dict]] = mapped_column(JSONB)
    raw_user_meta_data: Mapped[Optional[dict]] = mapped_column(JSONB)
    is_super_admin: Mapped[Optional[bool]] = mapped_column(Boolean)
    created_at: Mapped[Optional[datetime.datetime]] = mapped_column(DateTime(True))
    updated_at: Mapped[Optional[datetime.datetime]] = mapped_column(DateTime(True))
    phone: Mapped[Optional[str]] = mapped_column(
        Text, server_default=text("NULL::character varying")
    )
    phone_confirmed_at: Mapped[Optional[datetime.datetime]] = mapped_column(
        DateTime(True)
    )
    phone_change: Mapped[Optional[str]] = mapped_column(
        Text, server_default=text("''::character varying")
    )
    phone_change_token: Mapped[Optional[str]] = mapped_column(
        String(255), server_default=text("''::character varying")
    )
    phone_change_sent_at: Mapped[Optional[datetime.datetime]] = mapped_column(
        DateTime(True)
    )
    confirmed_at: Mapped[Optional[datetime.datetime]] = mapped_column(
        DateTime(True),
        Computed("LEAST(email_confirmed_at, phone_confirmed_at)", persisted=True),
    )
    email_change_token_current: Mapped[Optional[str]] = mapped_column(
        String(255), server_default=text("''::character varying")
    )
    email_change_confirm_status: Mapped[Optional[int]] = mapped_column(
        SmallInteger, server_default=text("0")
    )
    banned_until: Mapped[Optional[datetime.datetime]] = mapped_column(DateTime(True))
    reauthentication_token: Mapped[Optional[str]] = mapped_column(
        String(255), server_default=text("''::character varying")
    )
    reauthentication_sent_at: Mapped[Optional[datetime.datetime]] = mapped_column(
        DateTime(True)
    )
    deleted_at: Mapped[Optional[datetime.datetime]] = mapped_column(DateTime(True))


class Group(Base):
    __tablename__ = "group"
    __table_args__ = (
        PrimaryKeyConstraint("id", name="Group_pkey"),
        UniqueConstraint("id", name="Group_id_key"),
    )

    id: Mapped[uuid.UUID] = mapped_column(
        Uuid, primary_key=True, server_default=text("gen_random_uuid()")
    )
    name: Mapped[str] = mapped_column(Text, nullable=False)
    created_at: Mapped[datetime.datetime] = mapped_column(
        DateTime(True), nullable=False, server_default=text("now()")
    )
    image_url: Mapped[Optional[str]] = mapped_column(Text)

    def __init__(
        self,
        *,
        name: str,
        image_url: Optional[str] = None,
        id: Optional[uuid.UUID | str] = None,
        created_at: Optional[datetime.datetime] = None,
    ) -> None:
        self.name = name
        self.image_url = image_url
        if id is not None:
            self.id = id if isinstance(id, uuid.UUID) else uuid.UUID(id)
        if created_at is not None:
            self.created_at = created_at

    debt: Mapped[list["Debt"]] = relationship("Debt", back_populates="group")
    expense: Mapped[list["Expense"]] = relationship("Expense", back_populates="group")
    user_group: Mapped[list["UserGroup"]] = relationship(
        "UserGroup", back_populates="group"
    )


t_hypopg_hidden_indexes = Table(
    "hypopg_hidden_indexes",
    Base.metadata,
    Column("indexrelid", OID),
    Column("index_name", String),
    Column("schema_name", String),
    Column("table_name", String),
    Column("am_name", String),
    Column("is_hypo", Boolean),
)


t_hypopg_list_indexes = Table(
    "hypopg_list_indexes",
    Base.metadata,
    Column("indexrelid", OID),
    Column("index_name", Text),
    Column("schema_name", String),
    Column("table_name", String),
    Column("am_name", String),
)


t_pg_stat_statements = Table(
    "pg_stat_statements",
    Base.metadata,
    Column("userid", OID),
    Column("dbid", OID),
    Column("toplevel", Boolean),
    Column("queryid", BigInteger),
    Column("query", Text),
    Column("plans", BigInteger),
    Column("total_plan_time", Double(53)),
    Column("min_plan_time", Double(53)),
    Column("max_plan_time", Double(53)),
    Column("mean_plan_time", Double(53)),
    Column("stddev_plan_time", Double(53)),
    Column("calls", BigInteger),
    Column("total_exec_time", Double(53)),
    Column("min_exec_time", Double(53)),
    Column("max_exec_time", Double(53)),
    Column("mean_exec_time", Double(53)),
    Column("stddev_exec_time", Double(53)),
    Column("rows", BigInteger),
    Column("shared_blks_hit", BigInteger),
    Column("shared_blks_read", BigInteger),
    Column("shared_blks_dirtied", BigInteger),
    Column("shared_blks_written", BigInteger),
    Column("local_blks_hit", BigInteger),
    Column("local_blks_read", BigInteger),
    Column("local_blks_dirtied", BigInteger),
    Column("local_blks_written", BigInteger),
    Column("temp_blks_read", BigInteger),
    Column("temp_blks_written", BigInteger),
    Column("shared_blk_read_time", Double(53)),
    Column("shared_blk_write_time", Double(53)),
    Column("local_blk_read_time", Double(53)),
    Column("local_blk_write_time", Double(53)),
    Column("temp_blk_read_time", Double(53)),
    Column("temp_blk_write_time", Double(53)),
    Column("wal_records", BigInteger),
    Column("wal_fpi", BigInteger),
    Column("wal_bytes", Numeric),
    Column("jit_functions", BigInteger),
    Column("jit_generation_time", Double(53)),
    Column("jit_inlining_count", BigInteger),
    Column("jit_inlining_time", Double(53)),
    Column("jit_optimization_count", BigInteger),
    Column("jit_optimization_time", Double(53)),
    Column("jit_emission_count", BigInteger),
    Column("jit_emission_time", Double(53)),
    Column("jit_deform_count", BigInteger),
    Column("jit_deform_time", Double(53)),
    Column("stats_since", DateTime(True)),
    Column("minmax_stats_since", DateTime(True)),
)


t_pg_stat_statements_info = Table(
    "pg_stat_statements_info",
    Base.metadata,
    Column("dealloc", BigInteger),
    Column("stats_reset", DateTime(True)),
)


class User(Users):
    __tablename__ = "user"
    __table_args__ = (
        ForeignKeyConstraint(
            ["id"],
            ["auth.users.id"],
            ondelete="CASCADE",
            onupdate="CASCADE",
            name="users_id_fkey",
        ),
        PrimaryKeyConstraint("id", name="profiles_pkey"),
        UniqueConstraint("username", name="profiles_username_key"),
    )

    id: Mapped[uuid.UUID] = mapped_column(
        Uuid, primary_key=True, server_default=text("auth.uid()")
    )
    username: Mapped[str] = mapped_column(Text, nullable=False)
    realname: Mapped[str] = mapped_column(Text, nullable=False)
    created_at: Mapped[Optional[datetime.datetime]] = mapped_column(
        DateTime(True), nullable=False, server_default=text("now()")
    )
    image_url: Mapped[Optional[str]] = mapped_column(Text)

    def __init__(
        self,
        *,
        id: uuid.UUID | str,
        username: str,
        realname: str,
        image_url: Optional[str] = None,
        created_at: Optional[datetime.datetime] = None,
    ) -> None:
        self.id = id if isinstance(id, uuid.UUID) else uuid.UUID(id)
        self.username = username
        self.realname = realname
        self.image_url = image_url
        if created_at is not None:
            self.created_at = created_at

    user2: Mapped[list["User"]] = relationship(
        "User",
        secondary="friend",
        primaryjoin=lambda: User.id == t_friend.c.user1_id,
        secondaryjoin=lambda: User.id == t_friend.c.user2_id,
        back_populates="user1",
    )
    user1: Mapped[list["User"]] = relationship(
        "User",
        secondary="friend",
        primaryjoin=lambda: User.id == t_friend.c.user2_id,
        secondaryjoin=lambda: User.id == t_friend.c.user1_id,
        back_populates="user2",
    )
    debt_borrower: Mapped[list["Debt"]] = relationship(
        "Debt", foreign_keys="[Debt.borrower_id]", back_populates="borrower"
    )
    debt_lender: Mapped[list["Debt"]] = relationship(
        "Debt", foreign_keys="[Debt.lender_id]", back_populates="lender"
    )
    expense: Mapped[list["Expense"]] = relationship("Expense", back_populates="payer")
    friend_request_receiver: Mapped[list["FriendRequest"]] = relationship(
        "FriendRequest",
        foreign_keys="[FriendRequest.receiver_id]",
        back_populates="receiver",
    )
    friend_request_sender: Mapped[list["FriendRequest"]] = relationship(
        "FriendRequest",
        foreign_keys="[FriendRequest.sender_id]",
        back_populates="sender",
    )
    user_group: Mapped[list["UserGroup"]] = relationship(
        "UserGroup", back_populates="user"
    )
    expense_split: Mapped[list["ExpenseSplit"]] = relationship(
        "ExpenseSplit", back_populates="user"
    )


class Debt(Base):
    __tablename__ = "debt"
    __table_args__ = (
        ForeignKeyConstraint(
            ["borrower_id"],
            ["user.id"],
            ondelete="CASCADE",
            onupdate="CASCADE",
            name="debts_borrower_id_fkey",
        ),
        ForeignKeyConstraint(
            ["group_id"],
            ["group.id"],
            ondelete="CASCADE",
            onupdate="CASCADE",
            name="debts_group_id_fkey",
        ),
        ForeignKeyConstraint(
            ["lender_id"],
            ["user.id"],
            ondelete="CASCADE",
            onupdate="CASCADE",
            name="debts_lender_id_fkey",
        ),
        PrimaryKeyConstraint("group_id", "lender_id", "borrower_id", name="debt_pkey"),
    )

    created_at: Mapped[datetime.datetime] = mapped_column(
        DateTime(True), nullable=False, server_default=text("now()")
    )
    group_id: Mapped[uuid.UUID] = mapped_column(Uuid, primary_key=True)
    lender_id: Mapped[uuid.UUID] = mapped_column(Uuid, primary_key=True)
    borrower_id: Mapped[uuid.UUID] = mapped_column(Uuid, primary_key=True)
    amount: Mapped[float] = mapped_column(Double(53), nullable=False)
    is_paid: Mapped[bool] = mapped_column(
        Boolean, nullable=False, server_default=text("false")
    )

    def __init__(
        self,
        *,
        group_id: uuid.UUID | str,
        lender_id: uuid.UUID | str,
        borrower_id: uuid.UUID | str,
        amount: float,
        is_paid: bool = False,
        created_at: Optional[datetime.datetime] = None,
    ) -> None:
        self.group_id = (
            group_id if isinstance(group_id, uuid.UUID) else uuid.UUID(group_id)
        )
        self.lender_id = (
            lender_id if isinstance(lender_id, uuid.UUID) else uuid.UUID(lender_id)
        )
        self.borrower_id = (
            borrower_id
            if isinstance(borrower_id, uuid.UUID)
            else uuid.UUID(borrower_id)
        )
        self.amount = amount
        self.is_paid = is_paid
        if created_at is not None:
            self.created_at = created_at

    borrower: Mapped["User"] = relationship(
        "User", foreign_keys=[borrower_id], back_populates="debt_borrower"
    )
    group: Mapped["Group"] = relationship("Group", back_populates="debt")
    lender: Mapped["User"] = relationship(
        "User", foreign_keys=[lender_id], back_populates="debt_lender"
    )


class Expense(Base):
    __tablename__ = "expense"
    __table_args__ = (
        ForeignKeyConstraint(
            ["group_id"],
            ["group.id"],
            ondelete="CASCADE",
            onupdate="CASCADE",
            name="expense_group_id_fkey",
        ),
        ForeignKeyConstraint(
            ["payer_id"],
            ["user.id"],
            ondelete="CASCADE",
            onupdate="CASCADE",
            name="expenses_payer_id_fkey",
        ),
        PrimaryKeyConstraint("id", name="expenses_pkey"),
    )

    id: Mapped[uuid.UUID] = mapped_column(
        Uuid, primary_key=True, server_default=text("gen_random_uuid()")
    )
    created_at: Mapped[datetime.datetime] = mapped_column(
        DateTime(True), nullable=False, server_default=text("now()")
    )
    group_id: Mapped[uuid.UUID] = mapped_column(Uuid, nullable=False)
    payer_id: Mapped[uuid.UUID] = mapped_column(Uuid, nullable=False)
    amount: Mapped[float] = mapped_column(Double(53), nullable=False)
    category: Mapped[ExpenseCategory] = mapped_column(
        Enum(
            ExpenseCategory,
            values_callable=lambda cls: [member.value for member in cls],
            name="expense_category",
        ),
        nullable=False,
        server_default=text("'general'::expense_category"),
    )
    description: Mapped[Optional[str]] = mapped_column(Text)
    receipt_image_url: Mapped[Optional[str]] = mapped_column(Text)

    def __init__(
        self,
        *,
        group_id: uuid.UUID | str,
        payer_id: uuid.UUID | str,
        amount: float,
        category: ExpenseCategory | str = ExpenseCategory.GENERAL,
        description: Optional[str] = None,
        receipt_image_url: Optional[str] = None,
        id: Optional[uuid.UUID | str] = None,
        created_at: Optional[datetime.datetime] = None,
    ) -> None:
        self.group_id = (
            group_id if isinstance(group_id, uuid.UUID) else uuid.UUID(group_id)
        )
        self.payer_id = (
            payer_id if isinstance(payer_id, uuid.UUID) else uuid.UUID(payer_id)
        )
        self.amount = amount
        self.category = (
            category
            if isinstance(category, ExpenseCategory)
            else ExpenseCategory(category)
        )
        self.description = description
        self.receipt_image_url = receipt_image_url

        if id is not None:
            self.id = id if isinstance(id, uuid.UUID) else uuid.UUID(id)
        if created_at is not None:
            self.created_at = created_at

    group: Mapped["Group"] = relationship("Group", back_populates="expense")
    payer: Mapped["User"] = relationship("User", back_populates="expense")
    receipt_item: Mapped[list["ReceiptItem"]] = relationship(
        "ReceiptItem", back_populates="expense"
    )
    expense_split: Mapped[list["ExpenseSplit"]] = relationship(
        "ExpenseSplit", back_populates="expense"
    )


t_friend = Table(
    "friend",
    Base.metadata,
    Column("user2_id", Uuid, primary_key=True),
    Column("user1_id", Uuid, primary_key=True),
    CheckConstraint("user1_id < user2_id", name="friendships_user_order_chk"),
    ForeignKeyConstraint(
        ["user1_id"],
        ["user.id"],
        ondelete="CASCADE",
        onupdate="CASCADE",
        name="Friends_user1_id_fkey",
    ),
    ForeignKeyConstraint(
        ["user2_id"],
        ["user.id"],
        ondelete="CASCADE",
        onupdate="CASCADE",
        name="Friends_user2_id_fkey",
    ),
    PrimaryKeyConstraint("user2_id", "user1_id", name="Friends_pkey"),
)


class FriendRequest(Base):
    __tablename__ = "friend_request"
    __table_args__ = (
        ForeignKeyConstraint(
            ["receiver_id"], ["user.id"], name="friend_request_receiver_id_fkey"
        ),
        ForeignKeyConstraint(
            ["sender_id"], ["user.id"], name="friend_request_sender_id_fkey"
        ),
        PrimaryKeyConstraint("sender_id", "receiver_id", name="friend_request_pkey"),
        Index("unique_friend_request_pair", postgresql_include=[], unique=True),
    )

    sender_id: Mapped[uuid.UUID] = mapped_column(Uuid, primary_key=True)
    created_at: Mapped[datetime.datetime] = mapped_column(
        DateTime(True), nullable=False, server_default=text("now()")
    )
    receiver_id: Mapped[uuid.UUID] = mapped_column(Uuid, primary_key=True)

    def __init__(
        self,
        *,
        sender_id: uuid.UUID | str,
        receiver_id: uuid.UUID | str,
        created_at: Optional[datetime.datetime] = None,
    ) -> None:
        self.sender_id = (
            sender_id if isinstance(sender_id, uuid.UUID) else uuid.UUID(sender_id)
        )
        self.receiver_id = (
            receiver_id
            if isinstance(receiver_id, uuid.UUID)
            else uuid.UUID(receiver_id)
        )
        if created_at is not None:
            self.created_at = created_at

    receiver: Mapped["User"] = relationship(
        "User", foreign_keys=[receiver_id], back_populates="friend_request_receiver"
    )
    sender: Mapped["User"] = relationship(
        "User", foreign_keys=[sender_id], back_populates="friend_request_sender"
    )


class UserGroup(Base):
    __tablename__ = "user_group"
    __table_args__ = (
        ForeignKeyConstraint(
            ["group_id"],
            ["group.id"],
            ondelete="CASCADE",
            onupdate="CASCADE",
            name="user_group_group_id_fkey",
        ),
        ForeignKeyConstraint(
            ["user_id"],
            ["user.id"],
            ondelete="CASCADE",
            onupdate="CASCADE",
            name="user_group_user_id_fkey",
        ),
        PrimaryKeyConstraint("user_id", "group_id", name="user_group_pkey"),
    )

    user_id: Mapped[uuid.UUID] = mapped_column(Uuid, primary_key=True)
    group_id: Mapped[uuid.UUID] = mapped_column(Uuid, primary_key=True)
    balance: Mapped[float] = mapped_column(
        Double(53), nullable=False, server_default=text("'0'::double precision")
    )
    expense: Mapped[float] = mapped_column(
        Double(53), nullable=False, server_default=text("'0'::double precision")
    )

    def __init__(
        self,
        *,
        user_id: uuid.UUID | str,
        group_id: uuid.UUID | str,
        balance: float = 0.0,
        expense: float = 0.0,
    ) -> None:
        self.user_id = user_id if isinstance(user_id, uuid.UUID) else uuid.UUID(user_id)
        self.group_id = (
            group_id if isinstance(group_id, uuid.UUID) else uuid.UUID(group_id)
        )
        self.balance = balance
        self.expense = expense

    group: Mapped["Group"] = relationship("Group", back_populates="user_group")
    user: Mapped["User"] = relationship("User", back_populates="user_group")


class ReceiptItem(Base):
    __tablename__ = "receipt_item"
    __table_args__ = (
        ForeignKeyConstraint(
            ["expense_id"],
            ["expense.id"],
            ondelete="CASCADE",
            onupdate="CASCADE",
            name="receipt_items_expense_id_fkey",
        ),
        PrimaryKeyConstraint("id", name="receipt_item_pkey"),
    )

    id: Mapped[uuid.UUID] = mapped_column(
        Uuid, primary_key=True, server_default=text("gen_random_uuid()")
    )
    expense_id: Mapped[uuid.UUID] = mapped_column(
        Uuid, nullable=False, server_default=text("gen_random_uuid()")
    )
    name: Mapped[str] = mapped_column(Text, nullable=False)
    price: Mapped[float] = mapped_column(Double(53), nullable=False)
    created_at: Mapped[datetime.datetime] = mapped_column(
        DateTime(True), nullable=False, server_default=text("now()")
    )

    def __init__(
        self,
        *,
        expense_id: uuid.UUID | str,
        name: str,
        price: float,
        id: Optional[uuid.UUID | str] = None,
        created_at: Optional[datetime.datetime] = None,
    ) -> None:
        self.expense_id = (
            expense_id if isinstance(expense_id, uuid.UUID) else uuid.UUID(expense_id)
        )
        self.name = name
        self.price = price
        if id is not None:
            self.id = id if isinstance(id, uuid.UUID) else uuid.UUID(id)
        if created_at is not None:
            self.created_at = created_at

    expense: Mapped["Expense"] = relationship("Expense", back_populates="receipt_item")
    expense_split: Mapped[list["ExpenseSplit"]] = relationship(
        "ExpenseSplit", back_populates="receipt_item"
    )


class ExpenseSplit(Base):
    __tablename__ = "expense_split"
    __table_args__ = (
        ForeignKeyConstraint(
            ["expense_id"],
            ["expense.id"],
            ondelete="CASCADE",
            onupdate="CASCADE",
            name="expense_split_expense_id_fkey",
        ),
        ForeignKeyConstraint(
            ["receipt_item_id"],
            ["receipt_item.id"],
            ondelete="CASCADE",
            onupdate="CASCADE",
            name="expense_split_receipt_item_id_fkey",
        ),
        ForeignKeyConstraint(
            ["user_id"],
            ["user.id"],
            ondelete="CASCADE",
            onupdate="CASCADE",
            name="expense_splits_user_id_fkey",
        ),
        PrimaryKeyConstraint("id", name="expense_split_pkey"),
    )

    expense_id: Mapped[uuid.UUID] = mapped_column(Uuid, nullable=False)
    user_id: Mapped[uuid.UUID] = mapped_column(Uuid, nullable=False)
    amount: Mapped[float] = mapped_column(Double(53), nullable=False)
    created_at: Mapped[datetime.datetime] = mapped_column(
        DateTime(True), nullable=False, server_default=text("now()")
    )
    id: Mapped[uuid.UUID] = mapped_column(
        Uuid, primary_key=True, server_default=text("gen_random_uuid()")
    )
    receipt_item_id: Mapped[Optional[uuid.UUID]] = mapped_column(Uuid)

    def __init__(
        self,
        *,
        expense_id: uuid.UUID | str,
        user_id: uuid.UUID | str,
        amount: float,
        receipt_item_id: Optional[uuid.UUID | str] = None,
        id: Optional[uuid.UUID | str] = None,
        created_at: Optional[datetime.datetime] = None,
    ) -> None:
        self.expense_id = (
            expense_id if isinstance(expense_id, uuid.UUID) else uuid.UUID(expense_id)
        )
        self.user_id = user_id if isinstance(user_id, uuid.UUID) else uuid.UUID(user_id)
        self.amount = amount
        if receipt_item_id is not None:
            self.receipt_item_id = (
                receipt_item_id
                if isinstance(receipt_item_id, uuid.UUID)
                else uuid.UUID(receipt_item_id)
            )
        if id is not None:
            self.id = id if isinstance(id, uuid.UUID) else uuid.UUID(id)
        if created_at is not None:
            self.created_at = created_at

    expense: Mapped["Expense"] = relationship("Expense", back_populates="expense_split")
    receipt_item: Mapped[Optional["ReceiptItem"]] = relationship(
        "ReceiptItem", back_populates="expense_split"
    )
    user: Mapped["User"] = relationship("User", back_populates="expense_split")
